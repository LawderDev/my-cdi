import { describe, it, expect } from 'vitest'
import {
  serializeThemePreference,
  parseThemePreference,
  parseThemePreferenceFromArgv
} from '@lib/themePreference'
import { DEFAULT_THEME_PREFERENCE, THEME_ACCENTS, THEME_ARG_PREFIX, THEME_MODES } from '@types'

describe('serializeThemePreference', () => {
  it('serializes as accent:mode', () => {
    expect(serializeThemePreference({ accent: 'pink', mode: 'light' })).toBe('pink:light')
  })

  it('serializes the default preference', () => {
    expect(serializeThemePreference(DEFAULT_THEME_PREFERENCE)).toBe('purple:dark')
  })
})

describe('parseThemePreference', () => {
  it('round-trips every accent and mode combination', () => {
    for (const accent of THEME_ACCENTS) {
      for (const mode of THEME_MODES) {
        expect(parseThemePreference(`${accent}:${mode}`)).toEqual({ accent, mode })
      }
    }
  })

  it('returns null for undefined', () => {
    expect(parseThemePreference(undefined)).toBeNull()
  })

  it('returns null for an empty string', () => {
    expect(parseThemePreference('')).toBeNull()
  })

  it('returns null for an unknown accent', () => {
    expect(parseThemePreference('green:dark')).toBeNull()
  })

  it('returns null for an unknown mode', () => {
    expect(parseThemePreference('purple:sepia')).toBeNull()
  })

  it('returns null for extra segments', () => {
    expect(parseThemePreference('purple:dark:extra')).toBeNull()
  })
})

describe('parseThemePreferenceFromArgv', () => {
  it('parses the argument carrying the theme prefix', () => {
    const argv = ['electron', '.', `${THEME_ARG_PREFIX}blue:light`]
    expect(parseThemePreferenceFromArgv(argv)).toEqual({ accent: 'blue', mode: 'light' })
  })

  it('falls back to the default preference when no argument carries the prefix', () => {
    expect(parseThemePreferenceFromArgv(['electron', '.'])).toEqual(DEFAULT_THEME_PREFERENCE)
  })

  it('falls back to the default preference when the value is invalid', () => {
    const argv = ['electron', '.', `${THEME_ARG_PREFIX}pink:neon`]
    expect(parseThemePreferenceFromArgv(argv)).toEqual(DEFAULT_THEME_PREFERENCE)
  })
})