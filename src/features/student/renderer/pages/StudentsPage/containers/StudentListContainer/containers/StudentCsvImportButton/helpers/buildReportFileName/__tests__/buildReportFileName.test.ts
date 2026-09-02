import { describe, it, expect } from 'vitest'
import { buildReportFileName } from '../buildReportFileName'

describe('buildReportFileName', () => {
  it('appends the date and the .errors.txt suffix to the CSV base name', () => {
    const date = new Date('2026-09-02T14:30:00.000Z')
    expect(buildReportFileName('eleves.csv', date)).toBe('eleves-2026-09-02.errors.txt')
  })

  it('keeps dotted base names intact', () => {
    const date = new Date('2026-09-02T14:30:00.000Z')
    expect(buildReportFileName('base.v2.csv', date)).toBe('base.v2-2026-09-02.errors.txt')
  })
})
