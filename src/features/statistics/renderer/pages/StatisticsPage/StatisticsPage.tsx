import { useTranslation } from 'react-i18next'
import { StatisticsChartGrid, StatisticsLayout, StatisticsLoading } from './StatisticsPage.styles'
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
    return <StatisticsLoading variant="subtitle2">{t('loading')}</StatisticsLoading>
  }
  return (
    <StatisticsLayout>
      <StatsKpiCardsContainer stats={stats} />
      <PeriodFilterContainer value={period} onChange={setPeriod} />
      <StatisticsChartGrid>
        <WeeklyBarChartContainer dailyCounts={stats.dailyCounts} />
        <ActivityDonutChartContainer activityCounts={stats.activityCounts} />
      </StatisticsChartGrid>
      <StatisticsChartGrid>
        <MonthlyTrendChartContainer dailyCounts={stats.dailyCounts} />
      </StatisticsChartGrid>
    </StatisticsLayout>
  )
}
