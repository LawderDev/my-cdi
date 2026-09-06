import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import type { ReactNode } from 'react'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { ChartCardPresenter } from '@statistics/presenters/ChartCardPresenter'
import { ChartLegendPresenter } from '@statistics/presenters/ChartLegendPresenter'
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
  VALUE_OFFSET,
  ChartBody,
  ChartSvg,
  LegendDot,
  LegendItem,
  LegendLabel,
  LegendValue
} from './ActivityDonutChartContainer.styles'
import { useActivityDonutChart } from './hooks/useActivityDonutChart'
import type { ActivityDonutChartContainerProps } from './types/ActivityDonutChartContainerProps'

export function ActivityDonutChartContainer({ activityCounts }: ActivityDonutChartContainerProps) {
  const { t } = useTranslation('statistics')
  const theme = useTheme()
  const { slices, total, legendItems } = useActivityDonutChart(
    activityCounts,
    theme.palette.activity
  )
  const legendNodes: ReactNode[] = legendItems.map((item) => (
    <LegendItem key={item.label}>
      <LegendDot as="span" $color={item.color} />
      <LegendLabel as="span" variant="body2">
        {item.label}
      </LegendLabel>
      <LegendValue as="span" variant="body2">
        {item.value}
      </LegendValue>
    </LegendItem>
  ))
  return (
    <ChartCardPresenter titleIcon="donut_small" title={t('charts.activities')}>
      <ChartBody>
        <ChartSvg
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
            fill={theme.palette.text.primary}
            fontFamily={MONO_FONT_FAMILY}
            fontSize={VALUE_FONT_SIZE}
            fontWeight={VALUE_FONT_WEIGHT}
          >
            {total}
          </text>
          <text
            x={CX}
            y={CY + LABEL_OFFSET}
            textAnchor="middle"
            fill={theme.palette.text.disabled}
            fontFamily={theme.typography.fontFamily}
            fontSize={LABEL_FONT_SIZE}
            fontWeight={LABEL_FONT_WEIGHT}
          >
            {t('charts.visits')}
          </text>
        </ChartSvg>
        <ChartLegendPresenter legendNodes={legendNodes} />
      </ChartBody>
    </ChartCardPresenter>
  )
}
