import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { autoUpdater } from 'electron-updater'
import { createDbConnection, closeDbConnection } from '@shared/db/connection'
import { UPDATER_CHANNELS } from '@shared/ipc/updaterChannels'
import type {
  UpdateAvailableInfo,
  DownloadProgressInfo,
  UpdateDownloadedInfo,
  UpdateErrorInfo
} from '@shared/types/updater'
import { initializeModules } from './modules'

const DATABASE_PATH = 'data/database.db'
const WINDOW_WIDTH_PX = 1200
const WINDOW_HEIGHT_PX = 800
const APP_VERSION_CHANNEL = 'app:getVersion'

function registerAutoUpdater(targetWindow: BrowserWindow): void {
  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('update-available', (info) => {
    const payload: UpdateAvailableInfo = {
      version: info.version,
      releaseDate: info.releaseDate,
      releaseNotes: typeof info.releaseNotes === 'string' ? info.releaseNotes : undefined
    }
    targetWindow.webContents.send(UPDATER_CHANNELS.UPDATE_AVAILABLE, payload)
  })

  autoUpdater.on('update-not-available', () => {
    targetWindow.webContents.send(UPDATER_CHANNELS.UPDATE_NOT_AVAILABLE)
  })

  autoUpdater.on('download-progress', (progress) => {
    const payload: DownloadProgressInfo = {
      percent: progress.percent,
      bytesPerSecond: progress.bytesPerSecond,
      transferred: progress.transferred,
      total: progress.total
    }
    targetWindow.webContents.send(UPDATER_CHANNELS.DOWNLOAD_PROGRESS, payload)
  })

  autoUpdater.on('update-downloaded', (info) => {
    const payload: UpdateDownloadedInfo = {
      version: info.version,
      releaseDate: info.releaseDate
    }
    targetWindow.webContents.send(UPDATER_CHANNELS.UPDATE_DOWNLOADED, payload)
  })

  autoUpdater.on('error', (error) => {
    const payload: UpdateErrorInfo = {
      message: error instanceof Error ? error.message : 'Unknown updater error'
    }
    targetWindow.webContents.send(UPDATER_CHANNELS.UPDATE_ERROR, payload)
  })

  ipcMain.handle(UPDATER_CHANNELS.CHECK_FOR_UPDATES, async () => {
    return autoUpdater.checkForUpdates()
  })

  ipcMain.handle(UPDATER_CHANNELS.QUIT_AND_INSTALL, () => {
    autoUpdater.quitAndInstall()
  })

  void autoUpdater.checkForUpdatesAndNotify()
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH_PX,
    height: WINDOW_HEIGHT_PX,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  registerAutoUpdater(mainWindow)
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.my-cdi')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createDbConnection(DATABASE_PATH)
  initializeModules(ipcMain).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Failed to initialize modules: ${message}`)
  })

  ipcMain.handle(APP_VERSION_CHANNEL, () => {
    return { success: true, data: app.getVersion() }
  })

  createWindow()
})

app.on('window-all-closed', () => {
  closeDbConnection()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
