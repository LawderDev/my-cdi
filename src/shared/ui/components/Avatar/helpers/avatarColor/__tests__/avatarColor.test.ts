import { describe, it, expect } from 'vitest'
import { avatarColor, AVATAR_COLOR_PAIRS } from '../avatarColor'

describe('avatarColor', () => {
  it('exposes a fixed-length color palette', () => {
    const expectedPaletteSize = 12
    expect(AVATAR_COLOR_PAIRS).toHaveLength(expectedPaletteSize)
  })

  it('returns deterministic { bg, fg } for the same id', () => {
    const seed = 7
    const a = avatarColor(seed)
    const b = avatarColor(seed)
    expect(a).toEqual(b)
  })

  it('cycles through the palette by id modulo length', () => {
    const seed = 0
    const offset = AVATAR_COLOR_PAIRS.length
    expect(avatarColor(seed)).toEqual(avatarColor(seed + offset))
  })

  it('returns the first pair for id 0', () => {
    const result = avatarColor(0)
    const firstBg = AVATAR_COLOR_PAIRS[0][0]
    const firstFg = AVATAR_COLOR_PAIRS[0][1]
    expect(result.bg).toBe(firstBg)
    expect(result.fg).toBe(firstFg)
  })

  it('returns each result with bg and fg keys typed as string', () => {
    const sampleSeed = AVATAR_COLOR_PAIRS.length - 1
    const result = avatarColor(sampleSeed)
    expect(typeof result.bg).toBe('string')
    expect(typeof result.fg).toBe('string')
  })
})
