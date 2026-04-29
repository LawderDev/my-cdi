export enum ActivityType {
  WORK = 'work',
  READING = 'reading',
  COMPUTER = 'computer',
  RELAXATION = 'relaxation',
  OTHER = 'other'
}

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  [ActivityType.WORK]: 'Travail',
  [ActivityType.READING]: 'Lecture',
  [ActivityType.COMPUTER]: 'Ordinateur',
  [ActivityType.RELAXATION]: 'Détente',
  [ActivityType.OTHER]: 'Autre'
} as const

export const ACTIVITY_TYPES = Object.values(ActivityType) as ActivityType[]
