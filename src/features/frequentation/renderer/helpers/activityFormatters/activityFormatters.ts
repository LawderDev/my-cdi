import type { ActivityTone } from '@ui/theme'
import { theme } from '@ui/theme'
import { ActivityType } from '@types'

const ACTIVITY_TONE_MAP: Record<ActivityType, ActivityTone> = {
  [ActivityType.COMPUTER]: 'computer',
  [ActivityType.WORK]: 'work',
  [ActivityType.READING]: 'reading',
  [ActivityType.RELAXATION]: 'relaxation',
  [ActivityType.GAME]: 'game',
  [ActivityType.OTHER]: 'other'
}

const ACTIVITY_ICON_MAP: Record<ActivityType, string> = {
  [ActivityType.COMPUTER]: 'computer',
  [ActivityType.WORK]: 'edit',
  [ActivityType.READING]: 'menu_book',
  [ActivityType.RELAXATION]: 'weekend',
  [ActivityType.GAME]: 'casino',
  [ActivityType.OTHER]: 'more_horiz'
}

export function getActivityTone(activity: ActivityType): ActivityTone {
  return ACTIVITY_TONE_MAP[activity]
}

export function getActivityColor(activity: ActivityType): string {
  return theme.palette.activity[getActivityTone(activity)]
}

export function getActivityIcon(activity: ActivityType): string {
  return ACTIVITY_ICON_MAP[activity]
}
