import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { useStatisticsPage } from './hooks/useStatisticsPage'
import { StatsKpiCards } from './containers/StatsKpiCards'
import { PeriodFilter } from './containers/PeriodFilter'
import { WeeklyBarChart } from './containers/WeeklyBarChart'
import { ActivityDonutChart } from './containers/ActivityDonutChart'
import { MonthlyTrendChart } from './containers/MonthlyTrendChart'

const RESPONSIVE_BREAKPOINT_PX = 1100

export function StatisticsPage() {
  const { period, setPeriod, stats, isLoading } = useStatisticsPage()
  const { t } = useTranslation('statistics')
  if (isLoading || !stats) {
    return <Box sx={{ color: 'var(--text-dim)' }}>{t('loading')}</Box>
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <StatsKpiCards stats={stats} />
      <PeriodFilter value={period} onChange={setPeriod} />
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
        <WeeklyBarChart dailyCounts={stats.dailyCounts} />
        <ActivityDonutChart activityCounts={stats.activityCounts} />
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
        <MonthlyTrendChart dailyCounts={stats.dailyCounts} />
      </Box>
    </Box>
  )
}
