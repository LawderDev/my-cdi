import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import type { StatsForPeriodDto } from '@statistics-shared'
import { buildStatsKpiTones } from './helpers/buildStatsKpiTones'

export interface KpiViewModel {
  iconName: string
  iconBg: string
  iconColor: string
  label: string
  value: string
}

const RATE_SUFFIX = '%'

export function useStatsKpiCards(stats: StatsForPeriodDto): KpiViewModel[] {
  const { t } = useTranslation('statistics')
  const theme = useTheme()
  const tones = buildStatsKpiTones(theme.palette)
  return [
    {
      iconName: 'people',
      iconBg: tones.accentBg,
      iconColor: tones.accentColor,
      label: t('kpi.totalVisits'),
      value: stats.totalVisits.toLocaleString('fr-FR')
    },
    {
      iconName: 'trending_up',
      iconBg: tones.successBg,
      iconColor: tones.successColor,
      label: t('kpi.averagePerDay'),
      value: stats.averagePerDay.toLocaleString('fr-FR')
    },
    {
      iconName: 'wb_sunny',
      iconBg: tones.warningBg,
      iconColor: tones.warningColor,
      label: t('kpi.morningRate'),
      value: `${stats.morningRate}${RATE_SUFFIX}`
    },
    {
      iconName: 'nights_stay',
      iconBg: tones.infoBg,
      iconColor: tones.infoColor,
      label: t('kpi.afternoonRate'),
      value: `${stats.afternoonRate}${RATE_SUFFIX}`
    }
  ]
}