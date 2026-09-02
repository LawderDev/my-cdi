import { useTranslation } from 'react-i18next'
import { Loader } from '@ui/components/Loader'
import {
  StatisticsChartGrid,
  StatisticsFullGrid,
  StatisticsLayout,
  StatisticsLoadingShell
} from './StatisticsPage.styles'
import { useStatisticsPage } from './hooks/useStatisticsPage'
import { StatsKpiCardsContainer } from './containers/StatsKpiCardsContainer'
import { PeriodFilterContainer } from './containers/PeriodFilterContainer'
import { WeeklyBarChartContainer } from './containers/WeeklyBarChartContainer'
import { ActivityDonutChartContainer } from './containers/ActivityDonutChartContainer'
import { MonthlyTrendChartContainer } from './containers/MonthlyTrendChartContainer'

export function StatisticsPage() {
  const { period, setPeriod, stats, isLoading } = useStatisticsPage()
  const { t } = useTranslation('statistics')
  if (isLoading || !stats) {
    return (
      <StatisticsLoadingShell>
        <Loader message={t('loading')} />
      </StatisticsLoadingShell>
    )
  }
  return (
    <StatisticsLayout>
      <StatsKpiCardsContainer stats={stats} />
      <PeriodFilterContainer value={period} onChange={setPeriod} />
      <StatisticsChartGrid>
        <WeeklyBarChartContainer dailyCounts={stats.dailyCounts} />
        <ActivityDonutChartContainer activityCounts={stats.activityCounts} />
      </StatisticsChartGrid>
      <StatisticsFullGrid>
        <MonthlyTrendChartContainer dailyCounts={stats.dailyCounts} />
      </StatisticsFullGrid>
    </StatisticsLayout>
  )
}
