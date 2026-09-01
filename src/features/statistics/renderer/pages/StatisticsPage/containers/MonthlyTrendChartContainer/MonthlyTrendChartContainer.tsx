import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { ChartCardPresenter } from '@statistics/presenters/ChartCardPresenter'
import {
  DASH_PATTERN,
  DOT_RADIUS,
  GRADIENT_OPACITY_TOP,
  STROKE_WIDTH,
  Y_LABEL_FONT_SIZE,
  Y_LABEL_TEXT_OFFSET,
  ChartArea,
  ChartSvg
} from './MonthlyTrendChartContainer.styles'
import { Y_LABEL_OFFSET_X } from './helpers/buildTrendPath'
import { useMonthlyTrendChart } from './hooks/useMonthlyTrendChart'
import type { MonthlyTrendChartContainerProps } from './types/MonthlyTrendChartContainerProps'

export function MonthlyTrendChartContainer({ dailyCounts }: MonthlyTrendChartContainerProps) {
  const { t } = useTranslation('statistics')
  const theme = useTheme()
  const { trend, paddingLeft, innerRight } = useMonthlyTrendChart(dailyCounts)

  return (
    <ChartCardPresenter titleIcon="show_chart" title={t('charts.trend')}>
      <ChartArea>
        <ChartSvg viewBox={trend.viewBox} preserveAspectRatio="none" aria-label={t('charts.trend')}>
          <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme.palette.primary.main}
                stopOpacity={GRADIENT_OPACITY_TOP}
              />
              <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0} />
            </linearGradient>
          </defs>
          {trend.yLabels.map((label) => (
            <g key={label.label}>
              <line
                x1={paddingLeft}
                y1={label.y}
                x2={innerRight}
                y2={label.y}
                stroke={theme.palette.divider}
                strokeWidth={1}
                strokeDasharray={DASH_PATTERN}
              />
              <text
                x={paddingLeft - Y_LABEL_OFFSET_X}
                y={label.y + Y_LABEL_TEXT_OFFSET}
                textAnchor="end"
                fill={theme.palette.text.disabled}
                fontFamily={MONO_FONT_FAMILY}
                fontSize={Y_LABEL_FONT_SIZE}
              >
                {label.label}
              </text>
            </g>
          ))}
          {trend.areaPath ? <path d={trend.areaPath} fill="url(#trendGrad)" /> : null}
          {trend.path ? (
            <path
              d={trend.path}
              stroke={theme.palette.primary.main}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          {trend.dots.map((dot) => (
            <circle
              key={`${dot.cx}-${dot.cy}`}
              cx={dot.cx}
              cy={dot.cy}
              r={DOT_RADIUS}
              fill={theme.palette.primary.main}
              stroke={theme.palette.background.paper}
              strokeWidth={STROKE_WIDTH}
            />
          ))}
        </ChartSvg>
      </ChartArea>
    </ChartCardPresenter>
  )
}
