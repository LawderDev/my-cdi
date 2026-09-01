import { describe, it, expect } from 'vitest'
import { avatarColor, AVATAR_COLORS } from '../avatarColor'

describe('avatarColor', () => {
  it('exposes a fixed-length color palette', () => {
    const expectedPaletteSize = 12
    expect(AVATAR_COLORS).toHaveLength(expectedPaletteSize)
  })

  it('returns deterministic { bg, fg } for the same id', () => {
    const seed = 7
    const a = avatarColor(seed)
    const b = avatarColor(seed)
    expect(a).toEqual(b)
  })

  it('cycles through the palette by id modulo length', () => {
    const seed = 0
    const offset = AVATAR_COLORS.length
    expect(avatarColor(seed)).toEqual(avatarColor(seed + offset))
  })

  it('returns the first color for id 0', () => {
    const result = avatarColor(0)
    expect(result.bg).toBe(AVATAR_COLORS[0])
    expect(result.fg).toBe('#fff')
  })

  it('returns each result with bg and fg keys typed as string', () => {
    const sampleSeed = AVATAR_COLORS.length - 1
    const result = avatarColor(sampleSeed)
    expect(typeof result.bg).toBe('string')
    expect(typeof result.fg).toBe('string')
  })
})
