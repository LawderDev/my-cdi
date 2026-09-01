import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useStatsKpiCards } from '../useStatsKpiCards'
import type { StatsForPeriodDto } from '@statistics-shared'
import '@shared/i18n/config'

const TOTAL = 1247
const AVERAGE = 28.4
const MORNING = 57
const AFTERNOON = 43

const SAMPLE: StatsForPeriodDto = {
  totalVisits: TOTAL,
  averagePerDay: AVERAGE,
  morningRate: MORNING,
  afternoonRate: AFTERNOON,
  dailyCounts: [],
  activityCounts: [],
  classCounts: []
}

describe('useStatsKpiCards', () => {
  it('returns four render-ready KPI view models with translated labels', () => {
    const kpis = renderHook(() => useStatsKpiCards(SAMPLE)).result.current
    expect(kpis).toHaveLength(4)
    expect(kpis[0]).toMatchObject({ iconName: 'people', label: 'Visites totales' })
    expect(kpis[1]).toMatchObject({ iconName: 'trending_up', label: 'Moyenne / jour' })
    expect(kpis[2]).toMatchObject({ iconName: 'wb_sunny', label: 'Taux matin' })
    expect(kpis[3]).toMatchObject({ iconName: 'nights_stay', label: 'Taux après-midi' })
  })

  it('formats values with the French locale', () => {
    const kpis = renderHook(() => useStatsKpiCards(SAMPLE)).result.current
    expect(kpis[0]?.value).toBe('1 247')
    expect(kpis[1]?.value).toBe('28,4')
    expect(kpis[2]?.value).toBe('57%')
    expect(kpis[3]?.value).toBe('43%')
  })
})
