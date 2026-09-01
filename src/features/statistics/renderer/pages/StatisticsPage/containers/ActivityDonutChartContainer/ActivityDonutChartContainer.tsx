import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { ChartCardPresenter } from '@statistics/components/ChartCardPresenter'
import { ChartLegendPresenter } from '@statistics/components/ChartLegendPresenter'
import { MONO_FONT_FAMILY } from '@ui/theme'
import {
  CX,
  CY,
  FILL_OPACITY,
  LABEL_FONT_SIZE,
  LABEL_FONT_WEIGHT,
  LABEL_OFFSET,
  LEGEND_DOT_BORDER_RADIUS_PX,
  LEGEND_DOT_SIZE_PX,
  LEGEND_ITEM_FONT_SIZE_PX,
  LEGEND_VALUE_FONT_SIZE_PX,
  LEGEND_VALUE_FONT_WEIGHT,
  SIZE,
  VALUE_FONT_SIZE,
  VALUE_FONT_WEIGHT,
  VALUE_OFFSET
} from './ActivityDonutChartContainer.styles'
import { useActivityDonutChart } from './hooks/useActivityDonutChart'
import type { ActivityDonutChartContainerProps } from './types/ActivityDonutChartContainerProps'

export function ActivityDonutChartContainer({ activityCounts }: ActivityDonutChartContainerProps) {
  const { t } = useTranslation('statistics')
  const { slices, total, legendItems } = useActivityDonutChart(activityCounts)
  const legendNodes: ReactNode[] = legendItems.map((item) => (
    <Box
      key={item.label}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontSize: `${LEGEND_ITEM_FONT_SIZE_PX}px`
      }}
    >
      <Box
        component="span"
        sx={{
          width: `${LEGEND_DOT_SIZE_PX}px`,
          height: `${LEGEND_DOT_SIZE_PX}px`,
          borderRadius: `${LEGEND_DOT_BORDER_RADIUS_PX}px`,
          flexShrink: 0,
          background: item.color
        }}
      />
      <Box component="span" sx={{ color: 'var(--text)', flex: 1 }}>
        {item.label}
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: MONO_FONT_FAMILY,
          fontWeight: LEGEND_VALUE_FONT_WEIGHT,
          color: 'var(--title)',
          fontSize: `${LEGEND_VALUE_FONT_SIZE_PX}px`
        }}
      >
        {item.value}
      </Box>
    </Box>
  ))
  return (
    <ChartCardPresenter titleIcon="donut_small" title={t('charts.activities')}>
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
        <ChartLegendPresenter legendNodes={legendNodes} />
      </Box>
    </ChartCardPresenter>
  )
}
