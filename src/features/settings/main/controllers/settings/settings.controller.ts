import type { IpcMain } from 'electron'
import { createMainRouter } from '@shared/ipc/router'
import { SETTINGS_CHANNELS } from '@shared/ipc/channels'
import type { SettingGateway } from '@settings/gateways/setting'
import type { ThemePreferenceResponseDto, UpdateThemePreferenceDto } from '@settings-shared'
import { getThemePreference } from '@settings/use-cases/getThemePreference'
import { setThemePreference } from '@settings/use-cases/setThemePreference'
import { unwrap } from '@shared/lib/use-case'

export type IpcMainHandle = Pick<IpcMain, 'handle'>

export function registerSettingsController(
  ipcMain: IpcMainHandle,
  settingGateway: SettingGateway
): void {
  const router = createMainRouter(ipcMain)

  router.procedure<void, ThemePreferenceResponseDto>(SETTINGS_CHANNELS.GET_THEME, async () => {
    return unwrap(await getThemePreference(settingGateway))
  })

  router.procedure<UpdateThemePreferenceDto, ThemePreferenceResponseDto>(
    SETTINGS_CHANNELS.SET_THEME,
    async (input) => {
      return unwrap(await setThemePreference(settingGateway, input))
    }
  )
}
