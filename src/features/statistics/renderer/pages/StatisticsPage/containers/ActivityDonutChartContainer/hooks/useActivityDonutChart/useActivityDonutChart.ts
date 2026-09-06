import { useTranslation } from 'react-i18next'
import type { ActivityCountDto } from '@statistics-shared'
import type { ActivityTone } from '@ui/theme'
import { buildDonutSlices } from '../../helpers/buildDonutSlices'

export interface DonutLegendItem {
  color: string
  label: string
  value: number
}

export function useActivityDonutChart(
  activityCounts: ActivityCountDto[],
  activityColors: Record<ActivityTone, string>
) {
  const { t: tFreq } = useTranslation('frequentation')
  const slices = buildDonutSlices(activityCounts, activityColors)
  const total = activityCounts.reduce((sum, item) => sum + item.count, 0)
  const legendItems: DonutLegendItem[] = slices.map((slice) => ({
    color: slice.color,
    label: tFreq(`activity.${slice.activity}`),
    value: slice.value
  }))
  return { slices, total, legendItems }
}
