import type { ActivityType } from '@types'

export interface JournalEntryFormData {
  studentIds: number[]
  activity: ActivityType
  time: string
}
