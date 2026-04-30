import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WeeklyBarChart } from '../WeeklyBarChart'
import '@shared/i18n/config'

const FIVE = 5

describe('WeeklyBarChart', () => {
  it('renders the chart title', () => {
    render(<WeeklyBarChart dailyCounts={[]} />)
    expect(screen.getByText('Fréquentation par jour')).toBeInTheDocument()
  })

  it('renders all weekday labels', () => {
    render(<WeeklyBarChart dailyCounts={[]} />)
    for (const label of ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('renders the per-day value above each bar', () => {
    render(<WeeklyBarChart dailyCounts={[{ date: '2026-04-27', count: FIVE }]} />)
    expect(screen.getByText(String(FIVE))).toBeInTheDocument()
  })
})
