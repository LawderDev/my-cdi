import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatsKpiCardsContainer } from '../StatsKpiCardsContainer'
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

describe('StatsKpiCardsContainer', () => {
  it('renders the four KPI labels', () => {
    render(<StatsKpiCardsContainer stats={SAMPLE} />)
    expect(screen.getByText('Visites totales')).toBeInTheDocument()
    expect(screen.getByText('Moyenne / jour')).toBeInTheDocument()
    expect(screen.getByText('Taux matin')).toBeInTheDocument()
    expect(screen.getByText('Taux après-midi')).toBeInTheDocument()
  })

  it('formats numeric values with French locale', () => {
    render(<StatsKpiCardsContainer stats={SAMPLE} />)
    expect(screen.getByText('1 247')).toBeInTheDocument()
    expect(screen.getByText('28,4')).toBeInTheDocument()
    expect(screen.getByText('57%')).toBeInTheDocument()
    expect(screen.getByText('43%')).toBeInTheDocument()
  })
})
