import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { RESPONSIVE_BREAKPOINT_PX } from './StatisticsPage.styles'
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
    return <Box sx={{ color: 'var(--text-dim)' }}>{t('loading')}</Box>
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <StatsKpiCardsContainer stats={stats} />
      <PeriodFilterContainer value={period} onChange={setPeriod} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 2.5,
          [`@media (max-width: ${RESPONSIVE_BREAKPOINT_PX}px)`]: {
            gridTemplateColumns: '1fr'
          }
        }}
      >
        <WeeklyBarChartContainer dailyCounts={stats.dailyCounts} />
        <ActivityDonutChartContainer activityCounts={stats.activityCounts} />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 2.5,
          [`@media (max-width: ${RESPONSIVE_BREAKPOINT_PX}px)`]: {
            gridTemplateColumns: '1fr'
          }
        }}
      >
        <MonthlyTrendChartContainer dailyCounts={stats.dailyCounts} />
      </Box>
    </Box>
  )
}
