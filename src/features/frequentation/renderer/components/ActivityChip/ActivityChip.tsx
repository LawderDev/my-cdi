import { getActivityCssClass } from '@frequentation/helpers/activityFormatters'
import type { ActivityType } from '@types'

interface ActivityChipProps {
  activity: ActivityType
  label: string
}

const BASE_CLASSES =
  'att-activity inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-medium'

export function ActivityChip({ activity, label }: ActivityChipProps) {
  const cssClass = getActivityCssClass(activity)
  const finalClass = `${BASE_CLASSES} ${cssClass}`
  return (
    <span className={finalClass}>
      <span className="act-dot w-1.5 h-1.5 rounded-full inline-block" />
      {label}
    </span>
  )
}
