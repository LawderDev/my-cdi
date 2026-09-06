import type { SettingGateway } from '@settings/gateways/setting'
import { serializeThemePreference } from '@lib/themePreference'
import type { ThemePreferenceResponseDto, UpdateThemePreferenceDto } from '@settings-shared'
import { themePreferenceSchema } from '@settings-shared'
import { THEME_STORAGE_KEY } from '@types'

export type SetThemePreferenceResult =
  | { success: true; data: ThemePreferenceResponseDto }
  | { success: false; error: string }

export async function setThemePreference(
  settingGateway: SettingGateway,
  input: UpdateThemePreferenceDto
): Promise<SetThemePreferenceResult> {
  try {
    const preference = themePreferenceSchema.parse(input)
    const value = serializeThemePreference(preference)
    const existing = await settingGateway.getByKey(THEME_STORAGE_KEY)

    if (existing) {
      await settingGateway.update(THEME_STORAGE_KEY, value)
    } else {
      await settingGateway.create({ key: THEME_STORAGE_KEY, value })
    }

    return { success: true, data: preference }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
