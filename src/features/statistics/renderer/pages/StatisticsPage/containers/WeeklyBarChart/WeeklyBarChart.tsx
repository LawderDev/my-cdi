import { useTranslation } from 'react-i18next'
import { ChartCard } from '@statistics/components/ChartCard'
import { buildWeeklyBars } from './helpers/buildWeeklyBars'
import type { WeeklyBarChartProps } from './types/WeeklyBarChartProps'

const CHART_CLASSES = 'flex items-end gap-2 h-[180px] pt-2'
const COL_CLASSES = 'flex-1 flex flex-col items-center gap-1.5 h-full justify-end'
const VALUE_CLASSES = 'font-mono text-[10px] font-semibold text-title'
const BAR_CLASSES =
  'w-full max-w-[36px] rounded-t-md transition-all duration-300 ease-out cursor-default min-h-[4px]'
const LABEL_CLASSES = 'text-[10px] text-text-dim font-medium whitespace-nowrap'

export function WeeklyBarChart({ dailyCounts }: WeeklyBarChartProps) {
  const { t } = useTranslation('statistics')
  const bars = buildWeeklyBars(dailyCounts)
  return (
    <ChartCard titleIcon="bar_chart" title={t('charts.weekly')}>
      <div className={CHART_CLASSES}>
        {bars.map((bar) => (
          <div key={bar.label} className={COL_CLASSES}>
            <div className={VALUE_CLASSES}>{bar.value}</div>
            <div
              className={BAR_CLASSES}
              style={{ height: `${bar.heightPx}px`, background: bar.color }}
            />
            <div className={LABEL_CLASSES}>{bar.label}</div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
