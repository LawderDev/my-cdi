import type { ActivityType } from '@types'

export interface ActivityGridOption {
  value: ActivityType
  label: string
  iconName: string
}

export interface ActivityGridProps {
  options: ActivityGridOption[]
  value: ActivityType
  onChange: (next: ActivityType) => void
}
