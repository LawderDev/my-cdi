import { useTranslation } from 'react-i18next'
import { useStatisticsPage } from './hooks/useStatisticsPage'
import { StatsKpiCards } from './containers/StatsKpiCards'
import { PeriodFilter } from './containers/PeriodFilter'
import { WeeklyBarChart } from './containers/WeeklyBarChart'
import { ActivityDonutChart } from './containers/ActivityDonutChart'
import { MonthlyTrendChart } from './containers/MonthlyTrendChart'

const PAGE_CLASSES = 'flex flex-col gap-6'
const ROW_CLASSES = 'grid grid-cols-[2fr_1fr] gap-5 max-[1100px]:grid-cols-1'
const LOADING_CLASSES = 'text-text-dim'

export function StatisticsPage() {
  const { period, setPeriod, stats, isLoading } = useStatisticsPage()
  const { t } = useTranslation('statistics')
  if (isLoading || !stats) {
    return <div className={LOADING_CLASSES}>{t('loading')}</div>
  }
  return (
    <div className={PAGE_CLASSES}>
      <StatsKpiCards stats={stats} />
      <PeriodFilter value={period} onChange={setPeriod} />
      <div className={ROW_CLASSES}>
        <WeeklyBarChart dailyCounts={stats.dailyCounts} />
        <ActivityDonutChart activityCounts={stats.activityCounts} />
      </div>
      <div className={ROW_CLASSES}>
        <MonthlyTrendChart dailyCounts={stats.dailyCounts} />
      </div>
    </div>
  )
}
