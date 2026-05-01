export const ActivityType = {
  WORK: 'work',
  READING: 'reading',
  COMPUTER: 'computer',
  RELAXATION: 'relaxation',
  GAME: 'game',
  OTHER: 'other'
} as const

export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType]
