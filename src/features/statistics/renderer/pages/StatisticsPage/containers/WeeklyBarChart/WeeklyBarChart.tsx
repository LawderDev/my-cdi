import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { ChartCard } from '@statistics/components/ChartCard'
import { MONO_FONT_FAMILY } from '@ui/theme'
import { buildWeeklyBars } from './helpers/buildWeeklyBars'
import type { WeeklyBarChartProps } from './types/WeeklyBarChartProps'

const CHART_HEIGHT_PX = 180
const VALUE_FONT_SIZE_PX = 10
const VALUE_FONT_WEIGHT = 600
const LABEL_FONT_SIZE_PX = 10
const LABEL_FONT_WEIGHT = 500
const BAR_MAX_WIDTH_PX = 36
const BAR_MIN_HEIGHT_PX = 4
const BAR_BORDER_RADIUS_PX = 6

export function WeeklyBarChart({ dailyCounts }: WeeklyBarChartProps) {
  const { t } = useTranslation('statistics')
  const bars = buildWeeklyBars(dailyCounts)
  return (
    <ChartCard titleIcon="bar_chart" title={t('charts.weekly')}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          height: `${CHART_HEIGHT_PX}px`,
          pt: 1
        }}
      >
        {bars.map((bar) => (
          <Box
            key={bar.label}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.75,
              height: '100%',
              justifyContent: 'flex-end'
            }}
          >
            <Box
              sx={{
                fontFamily: MONO_FONT_FAMILY,
                fontSize: `${VALUE_FONT_SIZE_PX}px`,
                fontWeight: VALUE_FONT_WEIGHT,
                color: 'var(--title)'
              }}
            >
              {bar.value}
            </Box>
            <Box
              sx={{
                width: '100%',
                maxWidth: `${BAR_MAX_WIDTH_PX}px`,
                borderTopLeftRadius: `${BAR_BORDER_RADIUS_PX}px`,
                borderTopRightRadius: `${BAR_BORDER_RADIUS_PX}px`,
                transition: 'all 0.3s ease-out',
                cursor: 'default',
                minHeight: `${BAR_MIN_HEIGHT_PX}px`,
                height: `${bar.heightPx}px`,
                background: bar.color
              }}
            />
            <Box
              sx={{
                fontSize: `${LABEL_FONT_SIZE_PX}px`,
                color: 'var(--text-dim)',
                fontWeight: LABEL_FONT_WEIGHT,
                whiteSpace: 'nowrap'
              }}
            >
              {bar.label}
            </Box>
          </Box>
        ))}
      </Box>
    </ChartCard>
  )
}
