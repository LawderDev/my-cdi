import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import FrequentationService from '../services/frequentation.service'
import StudentService from '../services/student.service'
import type { Student } from '../types/student'
import type { Frequentation } from '../types/frequentation'

export function useJournalData(): {
  students: Student[]
  frequentations: Frequentation[]
  fetchDailyDataAt: (date: Dayjs) => Promise<void>
  createFrequentationsAt: (payload: Array<Record<string, unknown>>, date: Dayjs) => Promise<boolean>
  deleteFrequentationsAt: (ids: number[], date: Dayjs) => Promise<boolean>
} {
  const [students, setStudents] = useState<Student[]>([])
  const [frequentations, setFrequentations] = useState<Frequentation[]>([])

  const fetchDailyDataAt = async (date: Dayjs): Promise<void> => {
    const [studentRes, frequentationRes] = await Promise.all([
      StudentService.fetchStudentsWithoutFrequentationAt(date.format('YYYY-MM-DD')),
      FrequentationService.fetchFrequentationsAt(date.format('YYYY-MM-DD'))
    ])
    setStudents(studentRes.data ?? [])
    setFrequentations(frequentationRes.data ?? [])
  }

  const createFrequentationsAt = async (
    payload: Array<Record<string, unknown>>,
    date: Dayjs
  ): Promise<boolean> => {
    const result = await FrequentationService.createFrequentations(payload)
    if (result && result.success) {
      await fetchDailyDataAt(date)
      return true
    }
    return false
  }

  const deleteFrequentationsAt = async (ids: number[], date): Promise<boolean> => {
    const result = await FrequentationService.deleteFrequentations(ids)
    if (result && result.success) {
      await fetchDailyDataAt(date)
      return true
    }
    return false
  }

  return {
    students,
    frequentations,
    fetchDailyDataAt,
    createFrequentationsAt,
    deleteFrequentationsAt
  }
}

export default useJournalData
