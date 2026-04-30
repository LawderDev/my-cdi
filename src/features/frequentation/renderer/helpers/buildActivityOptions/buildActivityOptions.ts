import type { ActivityType } from '@types'
import { getActivityIcon } from '../activityFormatters'

export interface ActivityOption {
  value: ActivityType
  label: string
  iconName: string
}

export function buildActivityOptions(
  activities: ActivityType[],
  getLabel: (activity: ActivityType) => string
): ActivityOption[] {
  return activities.map((activity) => ({
    value: activity,
    label: getLabel(activity),
    iconName: getActivityIcon(activity)
  }))
}
