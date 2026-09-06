import type { SettingGateway } from '@settings/gateways/setting'
import type { ThemePreferenceResponseDto } from '@settings-shared'
import { parseThemePreference } from '@lib/themePreference'
import { DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY } from '@types'

export type GetThemePreferenceResult =
  | { success: true; data: ThemePreferenceResponseDto }
  | { success: false; error: string }

export async function getThemePreference(
  settingGateway: SettingGateway
): Promise<GetThemePreferenceResult> {
  try {
    const setting = await settingGateway.getByKey(THEME_STORAGE_KEY)
    const parsed = setting ? parseThemePreference(setting.value) : null

    return {
      success: true,
      data: parsed ?? DEFAULT_THEME_PREFERENCE
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
