import { describe, it, expect } from 'vitest'
import { alpha } from '@mui/material/styles'
import { createAppTheme, theme } from '../theme'
import { THEME_ACCENTS, THEME_MODES, DEFAULT_THEME_PREFERENCE, THEME_BACKGROUNDS } from '@types'

const ACCENT_GLOW_ALPHA = 0.35

type NeutralSlot = 'sidebar' | 'surface' | 'background.paper' | 'divider' | 'dividerStrong'

function paletteSlot(appTheme: ReturnType<typeof createAppTheme>, slot: NeutralSlot): string {
  switch (slot) {
    case 'sidebar':
      return appTheme.palette.sidebar
    case 'surface':
      return appTheme.palette.surface
    case 'background.paper':
      return appTheme.palette.background.paper
    case 'divider':
      return appTheme.palette.divider
    case 'dividerStrong':
      return appTheme.palette.dividerStrong
  }
}

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

  it('uses the per-theme background from the shared theme constants', () => {
    const backgrounds = new Set(
      ALL_PREFERENCES.map((preference) => THEME_BACKGROUNDS[preference.accent][preference.mode])
    )
    expect(backgrounds.size).toBe(ALL_PREFERENCES.length)
    for (const preference of ALL_PREFERENCES) {
      const appTheme = createAppTheme(preference)
      expect(appTheme.palette.background.default).toBe(
        THEME_BACKGROUNDS[preference.accent][preference.mode]
      )
    }
  })

  it('keeps the default purple palette identical to the original values', () => {
    const purpleDark = createAppTheme({ accent: 'purple', mode: 'dark' })
    const purpleLight = createAppTheme({ accent: 'purple', mode: 'light' })
    expect(purpleDark.palette.sidebar).toBe('#080f1e')
    expect(purpleDark.palette.surface).toBe('#172033')
    expect(purpleDark.palette.background.paper).toBe('#1e293b')
    expect(purpleDark.palette.text.primary).toBe('#e2e8f0')
    expect(purpleDark.palette.text.secondary).toBe('#94a3b8')
    expect(purpleDark.palette.text.disabled).toBe('#64748b')
    expect(purpleDark.palette.divider).toBe('#334155')
    expect(purpleDark.palette.dividerStrong).toBe('#475569')
    expect(purpleDark.shadows[1]).toBe('0 2px 12px rgba(0, 0, 0, 0.3)')
    expect(purpleDark.shadows[2]).toBe('0 8px 32px rgba(0, 0, 0, 0.4)')
    expect(purpleLight.palette.sidebar).toBe('#e2e8f0')
    expect(purpleLight.palette.surface).toBe('#e8edf5')
    expect(purpleLight.palette.background.paper).toBe('#ffffff')
    expect(purpleLight.palette.text.primary).toBe('#0f172a')
    expect(purpleLight.palette.text.secondary).toBe('#475569')
    expect(purpleLight.palette.divider).toBe('#cbd5e1')
    expect(purpleLight.palette.dividerStrong).toBe('#94a3b8')
    expect(purpleLight.shadows[1]).toBe('0 2px 12px rgba(15, 23, 42, 0.12)')
    expect(purpleLight.shadows[2]).toBe('0 8px 32px rgba(15, 23, 42, 0.18)')
    expect(THEME_BACKGROUNDS.purple).toEqual({ dark: '#0f172a', light: '#f1f5f9' })
  })

  it('recolors the whole chrome per accent, not only the primary', () => {
    const neutralSlots = [
      'sidebar',
      'surface',
      'background.paper',
      'divider',
      'dividerStrong'
    ] as const
    const lightNeutralSlots = ['sidebar', 'surface', 'divider', 'dividerStrong'] as const
    for (const mode of THEME_MODES) {
      const purpleTheme = createAppTheme({ accent: 'purple', mode })
      for (const accent of THEME_ACCENTS.filter((candidate) => candidate !== 'purple')) {
        const appTheme = createAppTheme({ accent, mode })
        for (const slot of mode === 'dark' ? neutralSlots : lightNeutralSlots) {
          expect(
            paletteSlot(appTheme, slot),
            `${accent}/${mode} ${slot} should differ from purple`
          ).not.toBe(paletteSlot(purpleTheme, slot))
        }
      }
    }
  })

  it('keeps status colors semantic per mode across accents', () => {
    for (const mode of THEME_MODES) {
      const statusSlots = ['info', 'success', 'warning', 'error'] as const
      for (const slot of statusSlots) {
        const values = THEME_ACCENTS.map(
          (accent) => createAppTheme({ accent, mode }).palette[slot].main
        )
        expect(new Set(values).size).toBe(1)
      }
    }
  })

  it('keeps text readable against the card and background in every combination', () => {
    for (const preference of ALL_PREFERENCES) {
      const appTheme = createAppTheme(preference)
      const backdropColors = [
        appTheme.palette.background.paper,
        appTheme.palette.background.default
      ]
      for (const textColor of [
        appTheme.palette.text.primary,
        appTheme.palette.text.secondary,
        appTheme.palette.text.disabled
      ]) {
        for (const backdropColor of backdropColors) {
          expect(
            textColor,
            `${JSON.stringify(preference)} ${textColor} on ${backdropColor}`
          ).not.toBe(backdropColor)
        }
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
