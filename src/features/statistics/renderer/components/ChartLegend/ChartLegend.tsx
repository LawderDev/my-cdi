import type { ChartLegendProps } from './types/ChartLegendProps'

const WRAPPER_CLASSES = 'flex flex-col gap-2'
const ITEM_CLASSES = 'flex items-center gap-2 text-xs'
const DOT_CLASSES = 'w-2 h-2 rounded-[2px] shrink-0'
const LABEL_CLASSES = 'text-text flex-1'
const VALUE_CLASSES = 'font-mono font-semibold text-title text-xs'

export function ChartLegend({ items }: ChartLegendProps) {
  return (
    <div className={WRAPPER_CLASSES}>
      {items.map((item) => (
        <div key={item.label} className={ITEM_CLASSES}>
          <span className={DOT_CLASSES} style={{ background: item.color }} />
          <span className={LABEL_CLASSES}>{item.label}</span>
          <span className={VALUE_CLASSES}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}
