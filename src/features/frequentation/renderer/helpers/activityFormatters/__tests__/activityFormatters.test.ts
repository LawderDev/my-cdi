import { describe, it, expect } from 'vitest'
import { getActivityColor, getActivityIcon, getActivityTone } from '../activityFormatters'
import { theme } from '@ui/theme'
import { ActivityType } from '@types'

const HEX_REGEX = /^#[0-9a-f]{6}$/i

describe('getActivityTone', () => {
  it('maps each ActivityType to its theme tone', () => {
    expect(getActivityTone(ActivityType.COMPUTER)).toBe('computer')
    expect(getActivityTone(ActivityType.WORK)).toBe('work')
    expect(getActivityTone(ActivityType.READING)).toBe('reading')
    expect(getActivityTone(ActivityType.RELAXATION)).toBe('relaxation')
    expect(getActivityTone(ActivityType.GAME)).toBe('game')
    expect(getActivityTone(ActivityType.OTHER)).toBe('other')
  })
})

describe('getActivityColor', () => {
  it('returns a hex color for each ActivityType', () => {
    expect(getActivityColor(ActivityType.WORK, theme.palette.activity)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.READING, theme.palette.activity)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.COMPUTER, theme.palette.activity)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.RELAXATION, theme.palette.activity)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.GAME, theme.palette.activity)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.OTHER, theme.palette.activity)).toMatch(HEX_REGEX)
  })

  it('sources each color from the theme activity palette', () => {
    expect(getActivityColor(ActivityType.COMPUTER, theme.palette.activity)).toBe(
      theme.palette.activity.computer
    )
    expect(getActivityColor(ActivityType.WORK, theme.palette.activity)).toBe(
      theme.palette.activity.work
    )
    expect(getActivityColor(ActivityType.READING, theme.palette.activity)).toBe(
      theme.palette.activity.reading
    )
    expect(getActivityColor(ActivityType.RELAXATION, theme.palette.activity)).toBe(
      theme.palette.activity.relaxation
    )
    expect(getActivityColor(ActivityType.GAME, theme.palette.activity)).toBe(
      theme.palette.activity.game
    )
    expect(getActivityColor(ActivityType.OTHER, theme.palette.activity)).toBe(
      theme.palette.activity.other
    )
  })

  it('returns distinct colors for distinct activities', () => {
    const seen = new Set([
      getActivityColor(ActivityType.WORK, theme.palette.activity),
      getActivityColor(ActivityType.READING, theme.palette.activity),
      getActivityColor(ActivityType.COMPUTER, theme.palette.activity),
      getActivityColor(ActivityType.RELAXATION, theme.palette.activity),
      getActivityColor(ActivityType.GAME, theme.palette.activity),
      getActivityColor(ActivityType.OTHER, theme.palette.activity)
    ])
    const expectedDistinct = 6
    expect(seen.size).toBe(expectedDistinct)
  })
})

describe('getActivityIcon', () => {
  it('returns a Material Icons Round name for each ActivityType', () => {
    expect(getActivityIcon(ActivityType.COMPUTER)).toBe('computer')
    expect(getActivityIcon(ActivityType.WORK)).toBe('edit')
    expect(getActivityIcon(ActivityType.READING)).toBe('menu_book')
    expect(getActivityIcon(ActivityType.RELAXATION)).toBe('weekend')
    expect(getActivityIcon(ActivityType.GAME)).toBe('casino')
    expect(getActivityIcon(ActivityType.OTHER)).toBe('more_horiz')
  })
})
