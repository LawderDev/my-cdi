import { describe, it, expect } from 'vitest'
import { ROUTES } from '@lib/routes'
import { buildSidebarItems } from '../buildSidebarItems'

const EXPECTED_ITEM_COUNT = 3

describe('buildSidebarItems', () => {
  it('returns three nav items in journal/statistics/students order', () => {
    const items = buildSidebarItems()
    expect(items).toHaveLength(EXPECTED_ITEM_COUNT)
    expect(items[0]?.path).toBe(ROUTES.JOURNAL)
    expect(items[1]?.path).toBe(ROUTES.STATISTICS)
    expect(items[2]?.path).toBe(ROUTES.STUDENTS)
  })

  it('maps each item to a Material Icons name and an i18n label key', () => {
    const items = buildSidebarItems()
    expect(items[0]).toMatchObject({ iconName: 'edit_note', labelKey: 'nav.journal' })
    expect(items[1]).toMatchObject({ iconName: 'bar_chart', labelKey: 'nav.statistics' })
    expect(items[2]).toMatchObject({ iconName: 'people', labelKey: 'nav.students' })
  })
})
