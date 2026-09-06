import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { IpcMain } from 'electron'
import { registerSettingsController } from '../settings.controller'
import { SETTINGS_CHANNELS } from '@shared/ipc/channels'
import type { SettingGateway } from '@settings/gateways/setting'
import type { SettingEntity } from '@settings/entities/setting'
import { DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY } from '@types'

const PINK_LIGHT: SettingEntity = { key: THEME_STORAGE_KEY, value: 'pink:light' }

type IpcMainHandle = Pick<IpcMain, 'handle'>
type IpcHandler = Parameters<IpcMain['handle']>[1]

interface IpcMainStub extends IpcMainHandle {
  invoke: (channel: string, payload: unknown) => Promise<unknown>
  registeredChannels: () => string[]
}

function createIpcMainStub(): IpcMainStub {
  const handlers = new Map<string, IpcHandler>()
  const handle: IpcMain['handle'] = (channel, listener) => {
    handlers.set(channel, listener)
  }
  return {
    handle,
    invoke: async (channel, payload) => {
      const listener = handlers.get(channel)
      if (!listener) {
        throw new Error(`No handler for ${channel}`)
      }
      const fakeEvent = Object.create(null)
      return listener(fakeEvent, payload)
    },
    registeredChannels: () => Array.from(handlers.keys())
  }
}

function createSettingGatewayStub(row: SettingEntity | null): SettingGateway {
  return {
    getByKey: vi.fn().mockResolvedValue(row),
    create: vi.fn().mockResolvedValue(PINK_LIGHT),
    update: vi.fn().mockResolvedValue(PINK_LIGHT)
  }
}

describe('registerSettingsController', () => {
  let ipcMain: IpcMainStub
  let settingGateway: SettingGateway

  beforeEach(() => {
    ipcMain = createIpcMainStub()
    settingGateway = createSettingGatewayStub(null)
    registerSettingsController(ipcMain, settingGateway)
  })

  it('registers every channel from SETTINGS_CHANNELS', () => {
    const registered = ipcMain.registeredChannels()
    for (const channel of Object.values(SETTINGS_CHANNELS)) {
      expect(registered).toContain(channel)
    }
  })

  it('returns the stored preference on GET_THEME', async () => {
    settingGateway = createSettingGatewayStub(PINK_LIGHT)
    registerSettingsController(ipcMain, settingGateway)

    const result = await ipcMain.invoke(SETTINGS_CHANNELS.GET_THEME, undefined)

    expect(result).toEqual({ success: true, data: { accent: 'pink', mode: 'light' } })
  })

  it('returns the default preference when no row exists', async () => {
    const result = await ipcMain.invoke(SETTINGS_CHANNELS.GET_THEME, undefined)

    expect(result).toEqual({ success: true, data: DEFAULT_THEME_PREFERENCE })
  })

  it('persists the new preference on SET_THEME', async () => {
    const result = await ipcMain.invoke(SETTINGS_CHANNELS.SET_THEME, {
      accent: 'pink',
      mode: 'light'
    })

    expect(result).toEqual({ success: true, data: { accent: 'pink', mode: 'light' } })
    expect(settingGateway.create).toHaveBeenCalledWith({
      key: THEME_STORAGE_KEY,
      value: 'pink:light'
    })
  })

  it('returns IpcResult error when the gateway throws', async () => {
    settingGateway = createSettingGatewayStub(null)
    vi.mocked(settingGateway.getByKey).mockRejectedValue(new Error('DB error'))
    registerSettingsController(ipcMain, settingGateway)

    const result = await ipcMain.invoke(SETTINGS_CHANNELS.SET_THEME, {
      accent: 'pink',
      mode: 'light'
    })

    expect(result).toEqual(expect.objectContaining({ success: false }))
  })
})
