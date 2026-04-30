import { describe, it, expect } from 'vitest'
import { getActivityColor, getActivityCssClass, getActivityIcon } from '../activityFormatters'
import { ActivityType } from '@types'

const HEX_REGEX = /^#[0-9a-f]{6}$/i

describe('getActivityColor', () => {
  it('returns a hex color for each ActivityType', () => {
    expect(getActivityColor(ActivityType.WORK)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.READING)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.COMPUTER)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.RELAXATION)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.GAME)).toMatch(HEX_REGEX)
    expect(getActivityColor(ActivityType.OTHER)).toMatch(HEX_REGEX)
  })

  it('matches the codesign palette', () => {
    expect(getActivityColor(ActivityType.COMPUTER)).toBe('#60a5fa')
    expect(getActivityColor(ActivityType.WORK)).toBe('#4ade80')
    expect(getActivityColor(ActivityType.READING)).toBe('#fbbf24')
    expect(getActivityColor(ActivityType.RELAXATION)).toBe('#c084fc')
    expect(getActivityColor(ActivityType.GAME)).toBe('#f87171')
    expect(getActivityColor(ActivityType.OTHER)).toBe('#94a3b8')
  })

  it('returns distinct colors for distinct activities', () => {
    const seen = new Set([
      getActivityColor(ActivityType.WORK),
      getActivityColor(ActivityType.READING),
      getActivityColor(ActivityType.COMPUTER),
      getActivityColor(ActivityType.RELAXATION),
      getActivityColor(ActivityType.GAME),
      getActivityColor(ActivityType.OTHER)
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

describe('getActivityCssClass', () => {
  it('returns the codesign-aligned CSS class for each ActivityType', () => {
    expect(getActivityCssClass(ActivityType.COMPUTER)).toBe('act-ordinateur')
    expect(getActivityCssClass(ActivityType.WORK)).toBe('act-travail')
    expect(getActivityCssClass(ActivityType.READING)).toBe('act-lecture')
    expect(getActivityCssClass(ActivityType.RELAXATION)).toBe('act-detente')
    expect(getActivityCssClass(ActivityType.GAME)).toBe('act-jeu')
    expect(getActivityCssClass(ActivityType.OTHER)).toBe('act-autre')
  })
})
