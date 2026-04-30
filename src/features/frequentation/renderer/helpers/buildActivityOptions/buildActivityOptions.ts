import type { ActivityType } from '@types'

export interface ActivityOption {
  value: ActivityType
  label: string
}

export function buildActivityOptions(
  activities: ActivityType[],
  getLabel: (activity: ActivityType) => string
): ActivityOption[] {
  return activities.map((activity) => ({
    value: activity,
    label: getLabel(activity)
  }))
}
