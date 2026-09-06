export const THEME_ACCENTS = ['purple', 'pink', 'blue', 'red', 'yellow'] as const

export type ThemeAccent = (typeof THEME_ACCENTS)[number]

export const THEME_MODES = ['dark', 'light'] as const

export type ThemeMode = (typeof THEME_MODES)[number]

export interface ThemePreference {
  accent: ThemeAccent
  mode: ThemeMode
}

export const DEFAULT_THEME_ACCENT: ThemeAccent = 'purple'
export const DEFAULT_THEME_MODE: ThemeMode = 'dark'

export const DEFAULT_THEME_PREFERENCE: ThemePreference = {
  accent: DEFAULT_THEME_ACCENT,
  mode: DEFAULT_THEME_MODE
}

export const THEME_ARG_PREFIX = '--theme='
export const THEME_STORAGE_KEY = 'theme'

export const THEME_BACKGROUNDS: Record<ThemeMode, string> = {
  dark: '#0f172a',
  light: '#f1f5f9'
}
