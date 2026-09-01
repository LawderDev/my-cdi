import { useTranslation } from 'react-i18next'
import type { StatsForPeriodDto } from '@statistics-shared'
import {
  ACCENT_BG,
  ACCENT_COLOR,
  INFO_BG,
  INFO_COLOR,
  SUCCESS_BG,
  SUCCESS_COLOR,
  WARNING_BG,
  WARNING_COLOR
} from '../../StatsKpiCards.styles'

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
  return [
    {
      iconName: 'people',
      iconBg: ACCENT_BG,
      iconColor: ACCENT_COLOR,
      label: t('kpi.totalVisits'),
      value: stats.totalVisits.toLocaleString('fr-FR')
    },
    {
      iconName: 'trending_up',
      iconBg: SUCCESS_BG,
      iconColor: SUCCESS_COLOR,
      label: t('kpi.averagePerDay'),
      value: stats.averagePerDay.toLocaleString('fr-FR')
    },
    {
      iconName: 'wb_sunny',
      iconBg: WARNING_BG,
      iconColor: WARNING_COLOR,
      label: t('kpi.morningRate'),
      value: `${stats.morningRate}${RATE_SUFFIX}`
    },
    {
      iconName: 'nights_stay',
      iconBg: INFO_BG,
      iconColor: INFO_COLOR,
      label: t('kpi.afternoonRate'),
      value: `${stats.afternoonRate}${RATE_SUFFIX}`
    }
  ]
}
