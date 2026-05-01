import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { StatCard } from '@statistics/components/StatCard'
import {
  ACCENT_BG,
  ACCENT_COLOR,
  INFO_BG,
  INFO_COLOR,
  RESPONSIVE_BREAKPOINT_PX,
  SUCCESS_BG,
  SUCCESS_COLOR,
  WARNING_BG,
  WARNING_COLOR
} from './StatsKpiCards.styles'
import type { StatsKpiCardsProps } from './types/StatsKpiCardsProps'

export function StatsKpiCards({ stats }: StatsKpiCardsProps) {
  const { t } = useTranslation('statistics')
  const totalDisplay = stats.totalVisits.toLocaleString('fr-FR')
  const averageDisplay = stats.averagePerDay.toLocaleString('fr-FR')
  const morningDisplay = `${stats.morningRate}%`
  const afternoonDisplay = `${stats.afternoonRate}%`
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
      <StatCard
        iconName="people"
        iconBg={ACCENT_BG}
        iconColor={ACCENT_COLOR}
        label={t('kpi.totalVisits')}
        value={totalDisplay}
      />
      <StatCard
        iconName="trending_up"
        iconBg={SUCCESS_BG}
        iconColor={SUCCESS_COLOR}
        label={t('kpi.averagePerDay')}
        value={averageDisplay}
      />
      <StatCard
        iconName="wb_sunny"
        iconBg={WARNING_BG}
        iconColor={WARNING_COLOR}
        label={t('kpi.morningRate')}
        value={morningDisplay}
      />
      <StatCard
        iconName="nights_stay"
        iconBg={INFO_BG}
        iconColor={INFO_COLOR}
        label={t('kpi.afternoonRate')}
        value={afternoonDisplay}
      />
    </Box>
  )
}
