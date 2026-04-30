import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { ChartCard } from '@statistics/components/ChartCard'
import {
  buildTrendPath,
  DEFAULT_TREND_DIMENSIONS,
  Y_LABEL_OFFSET_X
} from './helpers/buildTrendPath'
import type { MonthlyTrendChartProps } from './types/MonthlyTrendChartProps'

const CHART_HEIGHT_PX = 200
const ACCENT_COLOR = '#7C4DFF'
const DOT_RADIUS = 3
const STROKE_WIDTH = 2
const Y_LABEL_TEXT_OFFSET = 4
const GRADIENT_OPACITY_TOP = 0.3
const Y_LABEL_FONT_SIZE = 10
const DASH_PATTERN = '4,4'

export function MonthlyTrendChart({ dailyCounts }: MonthlyTrendChartProps) {
  const { t } = useTranslation('statistics')
  const trend = buildTrendPath(dailyCounts)
  const { paddingLeft, paddingRight, width } = DEFAULT_TREND_DIMENSIONS
  const innerRight = width - paddingRight

  return (
    <ChartCard titleIcon="show_chart" title={t('charts.trend')}>
      <Box sx={{ position: 'relative', height: `${CHART_HEIGHT_PX}px` }}>
        <Box
          component="svg"
          sx={{ width: '100%', height: '100%' }}
          viewBox={trend.viewBox}
          preserveAspectRatio="none"
          aria-label={t('charts.trend')}
        >
          <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT_COLOR} stopOpacity={GRADIENT_OPACITY_TOP} />
              <stop offset="100%" stopColor={ACCENT_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>
          {trend.yLabels.map((label) => (
            <g key={label.label}>
              <line
                x1={paddingLeft}
                y1={label.y}
                x2={innerRight}
                y2={label.y}
                stroke="var(--border)"
                strokeWidth={1}
                strokeDasharray={DASH_PATTERN}
              />
              <text
                x={paddingLeft - Y_LABEL_OFFSET_X}
                y={label.y + Y_LABEL_TEXT_OFFSET}
                textAnchor="end"
                fill="var(--text-dim)"
                fontFamily="var(--mono)"
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
              stroke={ACCENT_COLOR}
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
              fill={ACCENT_COLOR}
              stroke="var(--card)"
              strokeWidth={STROKE_WIDTH}
            />
          ))}
        </Box>
      </Box>
    </ChartCard>
  )
}
