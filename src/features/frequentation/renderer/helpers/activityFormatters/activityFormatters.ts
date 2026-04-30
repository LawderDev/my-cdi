import { ActivityType } from '@types'

const ACTIVITY_COLOR_MAP: Record<ActivityType, string> = {
  [ActivityType.WORK]: '#1976d2',
  [ActivityType.READING]: '#388e3c',
  [ActivityType.COMPUTER]: '#7b1fa2',
  [ActivityType.RELAXATION]: '#f57c00',
  [ActivityType.GAME]: '#d32f2f',
  [ActivityType.OTHER]: '#616161'
}

const ACTIVITY_ICON_MAP: Record<ActivityType, string> = {
  [ActivityType.WORK]: 'EditNote',
  [ActivityType.READING]: 'MenuBook',
  [ActivityType.COMPUTER]: 'Computer',
  [ActivityType.RELAXATION]: 'SelfImprovement',
  [ActivityType.GAME]: 'Casino',
  [ActivityType.OTHER]: 'MoreHoriz'
}

export function getActivityColor(activity: ActivityType): string {
  return ACTIVITY_COLOR_MAP[activity]
}

export function getActivityIcon(activity: ActivityType): string {
  return ACTIVITY_ICON_MAP[activity]
}
