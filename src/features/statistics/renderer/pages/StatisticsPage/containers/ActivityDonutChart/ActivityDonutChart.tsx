import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { ChartCard } from '@statistics/components/ChartCard'
import { ChartLegend } from '@statistics/components/ChartLegend'
import {
  CX,
  CY,
  FILL_OPACITY,
  LABEL_FONT_SIZE,
  LABEL_FONT_WEIGHT,
  LABEL_OFFSET,
  SIZE,
  VALUE_FONT_SIZE,
  VALUE_FONT_WEIGHT,
  VALUE_OFFSET
} from './ActivityDonutChart.styles'
import { buildDonutSlices } from './helpers/buildDonutSlices'
import type { ActivityDonutChartProps } from './types/ActivityDonutChartProps'

export function ActivityDonutChart({ activityCounts }: ActivityDonutChartProps) {
  const { t } = useTranslation('statistics')
  const { t: tFreq } = useTranslation('frequentation')
  const slices = buildDonutSlices(activityCounts)
  const total = activityCounts.reduce((sum, item) => sum + item.count, 0)
  const legendItems = slices.map((slice) => ({
    color: slice.color,
    label: tFreq(`activity.${slice.activity}`),
    value: slice.value
  }))
  return (
    <ChartCard titleIcon="donut_small" title={t('charts.activities')}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box
          component="svg"
          sx={{ flexShrink: 0 }}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-label={t('charts.activities')}
        >
          {slices.map((slice) => (
            <path key={slice.activity} d={slice.d} fill={slice.color} opacity={FILL_OPACITY} />
          ))}
          <text
            x={CX}
            y={CY + VALUE_OFFSET}
            textAnchor="middle"
            fill="var(--title)"
            fontFamily="var(--mono)"
            fontSize={VALUE_FONT_SIZE}
            fontWeight={VALUE_FONT_WEIGHT}
          >
            {total}
          </text>
          <text
            x={CX}
            y={CY + LABEL_OFFSET}
            textAnchor="middle"
            fill="var(--text-dim)"
            fontFamily="var(--font)"
            fontSize={LABEL_FONT_SIZE}
            fontWeight={LABEL_FONT_WEIGHT}
          >
            {t('charts.visits')}
          </text>
        </Box>
        <ChartLegend items={legendItems} />
      </Box>
    </ChartCard>
  )
}
