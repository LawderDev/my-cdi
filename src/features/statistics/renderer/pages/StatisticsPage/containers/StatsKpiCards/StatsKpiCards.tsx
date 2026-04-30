import { useTranslation } from 'react-i18next'
import { StatCard } from '@statistics/components/StatCard'
import type { StatsKpiCardsProps } from './types/StatsKpiCardsProps'

const GRID_CLASSES = 'grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2'

export function StatsKpiCards({ stats }: StatsKpiCardsProps) {
  const { t } = useTranslation('statistics')
  const totalDisplay = stats.totalVisits.toLocaleString('fr-FR')
  const averageDisplay = stats.averagePerDay.toLocaleString('fr-FR')
  const morningDisplay = `${stats.morningRate}%`
  const afternoonDisplay = `${stats.afternoonRate}%`
  return (
    <div className={GRID_CLASSES}>
      <StatCard
        iconName="people"
        iconBgClass="bg-accent-bg"
        iconColorClass="text-accent"
        label={t('kpi.totalVisits')}
        value={totalDisplay}
      />
      <StatCard
        iconName="trending_up"
        iconBgClass="bg-success-bg"
        iconColorClass="text-success"
        label={t('kpi.averagePerDay')}
        value={averageDisplay}
      />
      <StatCard
        iconName="wb_sunny"
        iconBgClass="bg-warning-bg"
        iconColorClass="text-warning"
        label={t('kpi.morningRate')}
        value={morningDisplay}
      />
      <StatCard
        iconName="nights_stay"
        iconBgClass="bg-[rgba(96,165,250,0.12)]"
        iconColorClass="text-[#60a5fa]"
        label={t('kpi.afternoonRate')}
        value={afternoonDisplay}
      />
    </div>
  )
}
