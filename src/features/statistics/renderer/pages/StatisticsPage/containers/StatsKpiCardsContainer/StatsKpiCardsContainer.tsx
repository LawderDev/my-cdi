import { StatCardPresenter } from '@statistics/presenters/StatCardPresenter'
import { StatsKpiGrid } from './StatsKpiCardsContainer.styles'
import { useStatsKpiCards } from './hooks/useStatsKpiCards'
import type { StatsKpiCardsContainerProps } from './types/StatsKpiCardsContainerProps'

export function StatsKpiCardsContainer({ stats }: StatsKpiCardsContainerProps) {
  const kpis = useStatsKpiCards(stats)
  return (
    <StatsKpiGrid>
      {kpis.map((kpi) => (
        <StatCardPresenter
          key={kpi.label}
          iconName={kpi.iconName}
          iconBg={kpi.iconBg}
          iconColor={kpi.iconColor}
          label={kpi.label}
          value={kpi.value}
        />
      ))}
    </StatsKpiGrid>
  )
}
