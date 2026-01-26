import type { Student } from './student'

export interface Frequentation {
  id: number
  starts_at: string
  activity: string
  created_at: string
  student: Student
  formattedStartTime: string
}

export interface CreateFrequentationPayload {
  startsAt: string
  activity: string
  studentId: number
}
