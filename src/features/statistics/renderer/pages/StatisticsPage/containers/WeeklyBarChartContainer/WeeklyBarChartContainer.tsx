import { useTranslation } from 'react-i18next'
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

export function WeeklyBarChartContainer({ dailyCounts }: WeeklyBarChartContainerProps) {
  const { t } = useTranslation('statistics')
  const { bars } = useWeeklyBarChart(dailyCounts)
  return (
    <ChartCardPresenter titleIcon="bar_chart" title={t('charts.weekly')}>
      <BarChartRow>
        {bars.map((bar) => (
          <BarColumn key={bar.label}>
            <BarValue>{bar.value}</BarValue>
            <BarFill $heightPx={bar.heightPx} $color={bar.color} />
            <BarLabel>{bar.label}</BarLabel>
          </BarColumn>
        ))}
      </BarChartRow>
    </ChartCardPresenter>
  )
}
