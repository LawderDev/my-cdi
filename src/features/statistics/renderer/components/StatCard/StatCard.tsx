import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import type { StatCardProps } from './types/StatCardProps'

const ICON_BASE = 'w-10 h-10 rounded-sm flex items-center justify-center mb-3 text-[20px] shrink-0'
const LABEL_CLASSES = 'text-[11px] font-semibold text-text-dim uppercase tracking-[0.8px] mb-2'
const VALUE_CLASSES = 'font-mono text-[28px] font-bold tracking-[-1px] leading-none'
const DELTA_BASE = 'text-xs mt-1.5 font-medium'
const DELTA_UP = 'text-success'
const DELTA_DOWN = 'text-danger'

export function StatCard({
  iconName,
  iconBgClass,
  iconColorClass,
  label,
  value,
  delta
}: StatCardProps) {
  const deltaClass = delta
    ? `${DELTA_BASE} ${delta.sign === 'up' ? DELTA_UP : DELTA_DOWN}`
    : DELTA_BASE
  const iconClasses = `${ICON_BASE} ${iconBgClass} ${iconColorClass}`
  return (
    <Card>
      <div className={iconClasses}>
        <Icon name={iconName} />
      </div>
      <div className={LABEL_CLASSES}>{label}</div>
      <div className={VALUE_CLASSES}>{value}</div>
      {delta ? <div className={deltaClass}>{delta.text}</div> : null}
    </Card>
  )
}
