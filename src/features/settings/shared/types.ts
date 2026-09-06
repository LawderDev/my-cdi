import { z } from 'zod'
import { THEME_ACCENTS, THEME_MODES } from '@types'

export const themePreferenceSchema = z.object({
  accent: z.enum(THEME_ACCENTS),
  mode: z.enum(THEME_MODES)
})

export type UpdateThemePreferenceDto = z.infer<typeof themePreferenceSchema>

export type ThemePreferenceResponseDto = z.infer<typeof themePreferenceSchema>
