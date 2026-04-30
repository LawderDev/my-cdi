import { ActivityGrid } from '@frequentation/components/ActivityGrid'
import type { ActivityGridOption } from '@frequentation/components/ActivityGrid'
import type { ActivityType } from '@types'

interface ActivityRadioGroupProps {
  activities: ActivityGridOption[]
  value: ActivityType
  onChange: (next: ActivityType) => void
}

export function ActivityRadioGroup({ activities, value, onChange }: ActivityRadioGroupProps) {
  return <ActivityGrid options={activities} value={value} onChange={onChange} />
}
