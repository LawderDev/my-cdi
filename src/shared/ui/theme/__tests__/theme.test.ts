import { describe, it, expect } from 'vitest'
import { alpha } from '@mui/material/styles'
import { createAppTheme, theme } from '../theme'
import { THEME_ACCENTS, THEME_MODES, DEFAULT_THEME_PREFERENCE, THEME_BACKGROUNDS } from '@types'

const ACCENT_GLOW_ALPHA = 0.35

const ALL_PREFERENCES = THEME_ACCENTS.flatMap((accent) =>
  THEME_MODES.map((mode) => ({ accent, mode }))
)

describe('createAppTheme', () => {
  it('exposes the default purple/dark instance as `theme`', () => {
    expect(theme.palette.primary.main).toBe('#7c4dff')
    expect(theme.palette.mode).toBe('dark')
  })

  it('caches themes per preference combination', () => {
    const preference = { accent: 'pink', mode: 'light' } as const
    expect(createAppTheme(preference)).toBe(createAppTheme(preference))
    expect(createAppTheme(DEFAULT_THEME_PREFERENCE)).toBe(theme)
  })

  it('builds a distinct theme object per accent and mode combination', () => {
    const builtThemes = ALL_PREFERENCES.map((preference) => createAppTheme(preference))
    const uniqueThemes = new Set(builtThemes)
    expect(uniqueThemes.size).toBe(ALL_PREFERENCES.length)
  })

  it('keeps the non-color tokens identical across combinations', () => {
    const referenceTypography = JSON.stringify(theme.typography)
    for (const preference of ALL_PREFERENCES) {
      const appTheme = createAppTheme(preference)
      expect(JSON.stringify(appTheme.typography)).toBe(referenceTypography)
      expect(appTheme.shape.borderRadius).toBe(theme.shape.borderRadius)
    }
  })

  it('uses the mode background from the shared theme constants', () => {
    for (const mode of THEME_MODES) {
      for (const accent of THEME_ACCENTS) {
        const appTheme = createAppTheme({ accent, mode })
        expect(appTheme.palette.background.default).toBe(THEME_BACKGROUNDS[mode])
      }
    }
  })

  it('keeps activity tones distinct within every palette', () => {
    for (const preference of ALL_PREFERENCES) {
      const activity = createAppTheme(preference).palette.activity
      const tones = Object.values(activity)
      expect(new Set(tones).size).toBe(tones.length)
    }
  })

  it('derives the relaxation tone from the accent', () => {
    const purpleDark = createAppTheme({ accent: 'purple', mode: 'dark' })
    const pinkDark = createAppTheme({ accent: 'pink', mode: 'dark' })
    expect(purpleDark.palette.activity.relaxation).not.toBe(pinkDark.palette.activity.relaxation)
  })

  it('styles scrollbars from the palette instead of literal hexes', () => {
    for (const preference of ALL_PREFERENCES) {
      const appTheme = createAppTheme(preference)
      const serializedComponents = JSON.stringify(appTheme.components)
      expect(serializedComponents).toContain(appTheme.palette.divider)
      expect(serializedComponents).toContain(appTheme.palette.dividerStrong)
    }
  })

  it('adapts shadows to the mode and the accent', () => {
    const dark = createAppTheme({ accent: 'purple', mode: 'dark' })
    const light = createAppTheme({ accent: 'purple', mode: 'light' })
    const pinkLight = createAppTheme({ accent: 'pink', mode: 'light' })
    expect(dark.shadows[1]).not.toBe(light.shadows[1])
    expect(light.shadows[3]).not.toBe(pinkLight.shadows[3])
    expect(light.shadows[3]).toBe(
      `0 2px 8px ${alpha(light.palette.primary.main, ACCENT_GLOW_ALPHA)}`
    )
  })
})
