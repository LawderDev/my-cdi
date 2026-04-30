import { describe, it, expect } from 'vitest'
import { ROUTES } from '@lib/routes'
import { buildNavItems } from '../buildNavItems'

const EXPECTED_NAV_ITEM_COUNT = 3
const INDEX_FIRST = 0
const INDEX_SECOND = 1
const INDEX_THIRD = 2

describe('buildNavItems', () => {
  it('returns nav items in journal-students-statistics order', () => {
    const items = buildNavItems()
    expect(items).toHaveLength(EXPECTED_NAV_ITEM_COUNT)
    expect(items[INDEX_FIRST]?.path).toBe(ROUTES.JOURNAL)
    expect(items[INDEX_SECOND]?.path).toBe(ROUTES.STUDENTS)
    expect(items[INDEX_THIRD]?.path).toBe(ROUTES.STATISTICS)
  })

  it('returns label keys under nav namespace', () => {
    const items = buildNavItems()
    expect(items[INDEX_FIRST]?.labelKey).toBe('nav.journal')
    expect(items[INDEX_SECOND]?.labelKey).toBe('nav.students')
    expect(items[INDEX_THIRD]?.labelKey).toBe('nav.statistics')
  })
})
