import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@ui/theme'
import { ActivityType } from '@types'
import type { ReactNode } from 'react'
import { ActivityDonutChartContainer } from '../ActivityDonutChartContainer'
import '@shared/i18n/config'

const FIVE = 5
const TEN = 10
const TOTAL = 15
const TWO = 2
const LEGEND_VALUE = 12

function withTheme(ui: ReactNode) {
  return <ThemeProvider theme={theme}>{ui}</ThemeProvider>
}

describe('ActivityDonutChartContainer', () => {
  it('renders the chart title', () => {
    render(withTheme(<ActivityDonutChartContainer activityCounts={[]} />))
    expect(screen.getByText('Activités')).toBeInTheDocument()
  })

  it('renders the total in the donut center', () => {
    render(
      withTheme(
        <ActivityDonutChartContainer
          activityCounts={[
            { activity: ActivityType.WORK, count: FIVE },
            { activity: ActivityType.READING, count: TEN }
          ]}
        />
      )
    )
    expect(screen.getByText(String(TOTAL))).toBeInTheDocument()
  })

  it('renders the legend with translated activity labels', () => {
    render(
      withTheme(
        <ActivityDonutChartContainer
          activityCounts={[
            { activity: ActivityType.WORK, count: LEGEND_VALUE },
            { activity: ActivityType.READING, count: FIVE }
          ]}
        />
      )
    )
    expect(screen.getByText('Travail')).toBeInTheDocument()
    expect(screen.getByText(String(LEGEND_VALUE))).toBeInTheDocument()
  })

  it('renders an SVG path for each non-empty slice', () => {
    const { container } = render(
      withTheme(
        <ActivityDonutChartContainer
          activityCounts={[
            { activity: ActivityType.WORK, count: FIVE },
            { activity: ActivityType.READING, count: TEN }
          ]}
        />
      )
    )
    expect(container.querySelectorAll('path').length).toBe(TWO)
  })
})
