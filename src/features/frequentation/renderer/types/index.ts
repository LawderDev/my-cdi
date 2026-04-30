import type { ActivityType } from '@types'

export interface FrequentationViewModel {
  id: number
  startsAt: string
  activity: ActivityType
  studentId: number
  studentNom: string
  studentPrenom: string
  studentClasse: string
  studentIne: string
  displayName: string
  activityLabel: string
  activityColor: string
}

export interface JournalEntryViewModel {
  id: number
  startsAt: string
  activity: ActivityType
  student: {
    id: number
    nom: string
    prenom: string
    classe: string
    ine: string
    displayName: string
  }
  activityLabel: string
  activityColor: string
}

export interface DateRangeFilter {
  startDate: string
  endDate: string
}
