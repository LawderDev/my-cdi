import Box from '@mui/material/Box'
import { StatCard } from '@statistics/components/StatCard'
import { RESPONSIVE_BREAKPOINT_PX } from './StatsKpiCards.styles'
import { useStatsKpiCards } from './hooks/useStatsKpiCards'
import type { StatsKpiCardsProps } from './types/StatsKpiCardsProps'

export function StatsKpiCards({ stats }: StatsKpiCardsProps) {
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
        <StatCard
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
