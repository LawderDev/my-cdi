import { Student } from './student'

export interface FrequentationStudent extends Student {
  fullName: string
}

export interface Frequentation {
  id: number
  starts_at: string
  activity: string
  created_at: string
  student: FrequentationStudent
  formattedStartTime: string
}
