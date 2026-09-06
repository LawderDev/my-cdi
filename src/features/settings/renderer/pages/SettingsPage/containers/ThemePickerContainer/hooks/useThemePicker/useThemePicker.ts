import { useTranslation } from 'react-i18next'
import { ACCENT_COLORS } from '@ui/theme'
import { THEME_ACCENTS, THEME_MODES, type ThemeAccent, type ThemeMode } from '@types'
import { useThemePreference } from '@settings/api/useThemePreference'
import { useSetThemePreference } from '@settings/api/useSetThemePreference'

export interface AccentOptionViewModel {
  key: ThemeAccent
  label: string
  swatch: string
  isActive: boolean
  onSelect: () => void
}

export interface ModeOptionViewModel {
  key: ThemeMode
  label: string
  isActive: boolean
  onSelect: () => void
}

export interface UseThemePickerReturn {
  accentOptions: AccentOptionViewModel[]
  modeOptions: ModeOptionViewModel[]
}

export function useThemePicker(): UseThemePickerReturn {
  const { t } = useTranslation('common')
  const preference = useThemePreference()
  const { mutate: setThemePreference } = useSetThemePreference()

  const activeAccent = preference.data.accent
  const activeMode = preference.data.mode

  const accentOptions: AccentOptionViewModel[] = THEME_ACCENTS.map((accent) => ({
    key: accent,
    label: t(`settings.color.${accent}`),
    swatch: ACCENT_COLORS[accent].dark.main,
    isActive: accent === activeAccent,
    onSelect: () => {
      setThemePreference({ accent, mode: activeMode })
    }
  }))

  const modeOptions: ModeOptionViewModel[] = THEME_MODES.map((mode) => ({
    key: mode,
    label: t(`settings.mode.${mode}`),
    isActive: mode === activeMode,
    onSelect: () => {
      setThemePreference({ accent: activeAccent, mode })
    }
  }))

  return { accentOptions, modeOptions }
}
