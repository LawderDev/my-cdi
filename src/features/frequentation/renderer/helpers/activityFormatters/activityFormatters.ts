import { ActivityType } from '@types'

const ACTIVITY_COLOR_MAP: Record<ActivityType, string> = {
  [ActivityType.COMPUTER]: '#60a5fa',
  [ActivityType.WORK]: '#4ade80',
  [ActivityType.READING]: '#fbbf24',
  [ActivityType.RELAXATION]: '#c084fc',
  [ActivityType.GAME]: '#f87171',
  [ActivityType.OTHER]: '#94a3b8'
}

const ACTIVITY_ICON_MAP: Record<ActivityType, string> = {
  [ActivityType.COMPUTER]: 'computer',
  [ActivityType.WORK]: 'edit',
  [ActivityType.READING]: 'menu_book',
  [ActivityType.RELAXATION]: 'weekend',
  [ActivityType.GAME]: 'casino',
  [ActivityType.OTHER]: 'more_horiz'
}

const ACTIVITY_CSS_CLASS_MAP: Record<ActivityType, string> = {
  [ActivityType.COMPUTER]: 'act-ordinateur',
  [ActivityType.WORK]: 'act-travail',
  [ActivityType.READING]: 'act-lecture',
  [ActivityType.RELAXATION]: 'act-detente',
  [ActivityType.GAME]: 'act-jeu',
  [ActivityType.OTHER]: 'act-autre'
}

export function getActivityColor(activity: ActivityType): string {
  return ACTIVITY_COLOR_MAP[activity]
}

export function getActivityIcon(activity: ActivityType): string {
  return ACTIVITY_ICON_MAP[activity]
}

export function getActivityCssClass(activity: ActivityType): string {
  return ACTIVITY_CSS_CLASS_MAP[activity]
}
