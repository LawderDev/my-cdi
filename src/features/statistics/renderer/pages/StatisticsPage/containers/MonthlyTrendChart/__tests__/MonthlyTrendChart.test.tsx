import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MonthlyTrendChart } from '../MonthlyTrendChart'
import '@shared/i18n/config'

const FIVE = 5
const TEN = 10
const TWO = 2

describe('MonthlyTrendChart', () => {
  it('renders the chart title', () => {
    render(<MonthlyTrendChart dailyCounts={[]} />)
    expect(screen.getByText('Évolution sur la période')).toBeInTheDocument()
  })

  it('renders no path elements when there are no daily counts', () => {
    const { container } = render(<MonthlyTrendChart dailyCounts={[]} />)
    expect(container.querySelectorAll('path').length).toBe(0)
  })

  it('renders the line and area paths plus dots when given counts', () => {
    const { container } = render(
      <MonthlyTrendChart
        dailyCounts={[
          { date: '2026-04-01', count: FIVE },
          { date: '2026-04-02', count: TEN }
        ]}
      />
    )
    expect(container.querySelectorAll('path').length).toBe(TWO)
    expect(container.querySelectorAll('circle').length).toBe(TWO)
  })
})
