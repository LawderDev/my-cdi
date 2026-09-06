import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { join } from 'path'
import { mkdirSync } from 'fs'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log/main'
import { createDbConnection, closeDbConnection, getDb } from '@shared/db/connection'
import { runMigrations } from '@shared/db/migrate'
import { APP_CHANNELS } from '@shared/ipc/channels'
import { UPDATER_CHANNELS } from '@shared/ipc/updaterChannels'
import { createMainRouter } from '@shared/ipc/router'
import type {
  UpdateAvailableInfo,
  DownloadProgressInfo,
  UpdateDownloadedInfo,
  UpdateErrorInfo
} from '@shared/types/updater'
import { serializeThemePreference } from '@lib/themePreference'
import { getThemePreference } from '@settings/use-cases/getThemePreference'
import { SettingGatewayDrizzle } from '@settings/gateways/setting'
import {
  DEFAULT_THEME_PREFERENCE,
  THEME_ARG_PREFIX,
  THEME_BACKGROUNDS,
  type ThemePreference
} from '@types'
import { initializeModules } from './modules'

log.initialize()

const DATABASE_DIR = join(app.getPath('userData'), 'data')
const DATABASE_PATH = join(DATABASE_DIR, 'database.db')
const WINDOW_WIDTH_PX = 1200
const WINDOW_HEIGHT_PX = 800
const WINDOW_MIN_WIDTH_PX = 800
const WINDOW_MIN_HEIGHT_PX = 600

process.on('uncaughtException', (err) => {
  log.error('Uncaught exception:', err)
})
process.on('unhandledRejection', (reason) => {
  log.error('Unhandled rejection:', reason)
})

function sendToAllWindows(channel: string, ...args: unknown[]): void {
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.send(channel, ...args)
  })
}

function registerAutoUpdater(): void {
  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('update-available', (info) => {
    const payload: UpdateAvailableInfo = {
      version: info.version,
      releaseDate: info.releaseDate,
      releaseNotes: typeof info.releaseNotes === 'string' ? info.releaseNotes : undefined
    }
    sendToAllWindows(UPDATER_CHANNELS.UPDATE_AVAILABLE, payload)
  })

  autoUpdater.on('update-not-available', () => {
    sendToAllWindows(UPDATER_CHANNELS.UPDATE_NOT_AVAILABLE)
  })

  autoUpdater.on('download-progress', (progress) => {
    const payload: DownloadProgressInfo = {
      percent: progress.percent,
      bytesPerSecond: progress.bytesPerSecond,
      transferred: progress.transferred,
      total: progress.total
    }
    sendToAllWindows(UPDATER_CHANNELS.DOWNLOAD_PROGRESS, payload)
  })

  autoUpdater.on('update-downloaded', (info) => {
    const payload: UpdateDownloadedInfo = {
      version: info.version,
      releaseDate: info.releaseDate
    }
    sendToAllWindows(UPDATER_CHANNELS.UPDATE_DOWNLOADED, payload)
  })

  autoUpdater.on('error', (error) => {
    const payload: UpdateErrorInfo = {
      message: error instanceof Error ? error.message : 'Unknown updater error'
    }
    sendToAllWindows(UPDATER_CHANNELS.UPDATE_ERROR, payload)
  })

  const router = createMainRouter(ipcMain)
  router.procedure(UPDATER_CHANNELS.CHECK_FOR_UPDATES, async () => autoUpdater.checkForUpdates())
  router.procedure(UPDATER_CHANNELS.QUIT_AND_INSTALL, async () => {
    autoUpdater.quitAndInstall()
  })

  if (process.env.AUTO_UPDATER_URL) {
    void autoUpdater.checkForUpdatesAndNotify()
  }
}

async function resolveStartupThemePreference(): Promise<ThemePreference> {
  try {
    const settingGateway = new SettingGatewayDrizzle(getDb())
    const result = await getThemePreference(settingGateway)
    if (result.success) {
      return result.data
    }
    log.warn(`Failed to read the theme preference: ${result.error}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    log.warn(`Failed to read the theme preference: ${message}`)
  }
  return DEFAULT_THEME_PREFERENCE
}

function createWindow(themePreference: ThemePreference): void {
  const mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH_PX,
    height: WINDOW_HEIGHT_PX,
    minWidth: WINDOW_MIN_WIDTH_PX,
    minHeight: WINDOW_MIN_HEIGHT_PX,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: THEME_BACKGROUNDS[themePreference.accent][themePreference.mode],
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      additionalArguments: [`${THEME_ARG_PREFIX}${serializeThemePreference(themePreference)}`]
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    const url = new URL(details.url)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return { action: 'deny' }
    }
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

let startupThemePreference: ThemePreference = DEFAULT_THEME_PREFERENCE

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    }
  })

  app.whenReady().then(async () => {
    if (process.platform === 'win32') {
      electronApp.setAppUserModelId('com.my-cdi')
    }

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    let dbInitialized = false
    try {
      mkdirSync(DATABASE_DIR, { recursive: true })
      createDbConnection(DATABASE_PATH)
      runMigrations()
      dbInitialized = true
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      log.error(`Failed to initialize database: ${message}`)
      log.error(`Database path: ${DATABASE_PATH}`)
      dialog.showErrorBox(
        'Database Error',
        `Failed to initialize the database.\n\nPath: ${DATABASE_PATH}\nError: ${message}\n\nIf the database schema is outdated, delete the file and restart the app.`
      )
      closeDbConnection()
      app.quit()
      return
    }

    if (dbInitialized) {
      initializeModules(ipcMain).catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown error'
        log.error(`Failed to initialize modules: ${message}`)
      })
    }

    createMainRouter(ipcMain).procedure(APP_CHANNELS.GET_VERSION, async () => app.getVersion())

    startupThemePreference = await resolveStartupThemePreference()
    createWindow(startupThemePreference)

    if (process.platform === 'darwin' || process.platform === 'win32') {
      registerAutoUpdater()
    }
  })

  app.on('before-quit', () => {
    closeDbConnection()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      closeDbConnection()
      app.quit()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(startupThemePreference)
    }
  })
}
