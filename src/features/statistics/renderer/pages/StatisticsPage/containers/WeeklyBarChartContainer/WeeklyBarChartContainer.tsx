import { useTranslation } from 'react-i18next'
import { alpha, useTheme } from '@mui/material/styles'
import { ChartCardPresenter } from '@statistics/presenters/ChartCardPresenter'
import {
  BarChartRow,
  BarColumn,
  BarFill,
  BarLabel,
  BarValue
} from './WeeklyBarChartContainer.styles'
import { useWeeklyBarChart } from './hooks/useWeeklyBarChart'
import type { WeeklyBarChartContainerProps } from './types/WeeklyBarChartContainerProps'

const WEEKEND_FILL_ALPHA = 0.4

export function WeeklyBarChartContainer({ dailyCounts }: WeeklyBarChartContainerProps) {
  const { t } = useTranslation('statistics')
  const theme = useTheme()
  const barColors = {
    weekday: theme.palette.primary.main,
    weekend: alpha(theme.palette.primary.main, WEEKEND_FILL_ALPHA)
  }
  const { bars } = useWeeklyBarChart(dailyCounts, barColors)
  return (
    <ChartCardPresenter titleIcon="bar_chart" title={t('charts.weekly')}>
      <BarChartRow>
        {bars.map((bar) => (
          <BarColumn key={bar.label}>
            <BarValue variant="caption">{bar.value}</BarValue>
            <BarFill $heightPx={bar.heightPx} $color={bar.color} />
            <BarLabel variant="caption">{bar.label}</BarLabel>
          </BarColumn>
        ))}
      </BarChartRow>
    </ChartCardPresenter>
  )
}
