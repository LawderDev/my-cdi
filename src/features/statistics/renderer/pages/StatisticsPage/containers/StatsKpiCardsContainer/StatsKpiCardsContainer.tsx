import Box from '@mui/material/Box'
import { StatCardPresenter } from '@statistics/components/StatCardPresenter'
import { RESPONSIVE_BREAKPOINT_PX } from './StatsKpiCardsContainer.styles'
import { useStatsKpiCards } from './hooks/useStatsKpiCards'
import type { StatsKpiCardsContainerProps } from './types/StatsKpiCardsContainerProps'

export function StatsKpiCardsContainer({ stats }: StatsKpiCardsContainerProps) {
  const kpis = useStatsKpiCards(stats)
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        [`@media (max-width: ${RESPONSIVE_BREAKPOINT_PX}px)`]: {
          gridTemplateColumns: 'repeat(2, 1fr)'
        }
      }}
    >
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
    </Box>
  )
}
