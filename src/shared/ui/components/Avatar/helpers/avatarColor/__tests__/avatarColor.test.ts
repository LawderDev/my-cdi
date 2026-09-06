import { describe, it, expect } from 'vitest'
import { avatarColor, buildAvatarColors } from '../avatarColor'
import { theme } from '@ui/theme'

const palette = theme.palette
const avatarColors = buildAvatarColors(palette)

describe('buildAvatarColors', () => {
  it('derives every background from the palette', () => {
    const paletteColors = new Set([
      palette.primary.main,
      palette.info.main,
      palette.success.main,
      palette.warning.main,
      palette.error.main,
      palette.activity.relaxation
    ])
    for (const pair of avatarColors) {
      expect(paletteColors.has(pair.bg)).toBe(true)
    }
  })

  it('pairs every background with a contrast foreground', () => {
    for (const pair of avatarColors) {
      expect(pair.fg).toBe(palette.getContrastText(pair.bg))
    }
  })

  it('exposes a fixed-length color palette', () => {
    const expectedPaletteSize = 6
    expect(avatarColors).toHaveLength(expectedPaletteSize)
  })
})

describe('avatarColor', () => {
  it('returns deterministic { bg, fg } for the same id', () => {
    const seed = 7
    const a = avatarColor(seed, palette)
    const b = avatarColor(seed, palette)
    expect(a).toEqual(b)
  })

  it('cycles through the palette by id modulo length', () => {
    const seed = 0
    const offset = avatarColors.length
    expect(avatarColor(seed, palette)).toEqual(avatarColor(seed + offset, palette))
  })

  it('returns the first color for id 0', () => {
    const result = avatarColor(0, palette)
    expect(result.bg).toBe(avatarColors[0]?.bg)
    expect(result.fg).toBe(avatarColors[0]?.fg)
  })

  it('returns each result with bg and fg keys typed as string', () => {
    const sampleSeed = avatarColors.length - 1
    const result = avatarColor(sampleSeed, palette)
    expect(typeof result.bg).toBe('string')
    expect(typeof result.fg).toBe('string')
  })
})
