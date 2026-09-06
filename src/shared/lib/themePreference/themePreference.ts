import {
  DEFAULT_THEME_PREFERENCE,
  THEME_ACCENTS,
  THEME_ARG_PREFIX,
  THEME_MODES,
  type ThemePreference
} from '@types'

export function serializeThemePreference(preference: ThemePreference): string {
  return `${preference.accent}:${preference.mode}`
}

export function parseThemePreference(raw: string | undefined): ThemePreference | null {
  if (!raw) {
    return null
  }
  const [accentValue, modeValue, ...unexpected] = raw.split(':')
  if (unexpected.length > 0) {
    return null
  }
  const accent = THEME_ACCENTS.find((candidate) => candidate === accentValue)
  const mode = THEME_MODES.find((candidate) => candidate === modeValue)
  if (!accent || !mode) {
    return null
  }
  return { accent, mode }
}

export function parseThemePreferenceFromArgv(argv: readonly string[]): ThemePreference {
  const raw = argv.find((argument) => argument.startsWith(THEME_ARG_PREFIX))
  const parsed = parseThemePreference(raw?.slice(THEME_ARG_PREFIX.length))
  if (!parsed) {
    return DEFAULT_THEME_PREFERENCE
  }
  return parsed
}
