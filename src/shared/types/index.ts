export const ActivityType = {
  WORK: 'work',
  READING: 'reading',
  COMPUTER: 'computer',
  RELAXATION: 'relaxation',
  GAME: 'game',
  OTHER: 'other'
} as const

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType]

export {
  THEME_ACCENTS,
  THEME_MODES,
  DEFAULT_THEME_ACCENT,
  DEFAULT_THEME_MODE,
  DEFAULT_THEME_PREFERENCE,
  THEME_ARG_PREFIX,
  THEME_STORAGE_KEY,
  THEME_BACKGROUNDS
} from './theme'
export type { ThemeAccent, ThemeMode, ThemePreference } from './theme'
