import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import FrequentationService from '../services/frequentation.service'
import StudentService from '../services/student.service'
import { frequentationHelpers } from '../helpers/frequentation.helpers'
import { studentHelpers } from '../helpers/student.helpers'
import { StudentViewModel, FrequentationViewModel } from '../types'

export function useJournalData(): {
  students: StudentViewModel[]
  frequentations: FrequentationViewModel[]
  fetchDailyDataAt: (date: Dayjs) => Promise<void>
  createFrequentationsAt: (payload: any[], date: Dayjs) => Promise<boolean>
  deleteFrequentationsAt: (ids: number[], date: Dayjs) => Promise<boolean>
} {
  const [students, setStudents] = useState<StudentViewModel[]>([])
  const [frequentations, setFrequentations] = useState<FrequentationViewModel[]>([])

  const fetchDailyDataAt = async (date: Dayjs): Promise<void> => {
    try {
      const [studentRes, frequentationRes] = await Promise.all([
        StudentService.fetchStudentsWithoutFrequentationAt(date.format('YYYY-MM-DD')),
        FrequentationService.fetchFrequentationsAt(date.format('YYYY-MM-DD'))
      ])
      console.log(
        'Raw frequentation DTOs:',
        frequentationRes.data?.map((dto) => ({
          id: dto.id,
          startsAt: dto.startsAt,
          activity: dto.activity,
          student: dto.student?.nom + ' ' + dto.student?.prenom
        }))
      )
      console.log('Data fetched - Students:', studentRes, 'Frequentations:', frequentationRes)

      const studentViewModels = studentRes.data ? studentHelpers.toViewModels(studentRes.data) : []
      const frequentationViewModels = frequentationRes.data
        ? frequentationHelpers.toViewModels(frequentationRes.data)
        : []

      console.log(
        'Data fetched - Students:',
        studentViewModels,
        'Frequentations:',
        frequentationViewModels
      )
      setStudents(studentViewModels)
      setFrequentations(frequentationViewModels)
    } catch (error) {
      console.error('Error fetching daily data:', error)
      setStudents([])
      setFrequentations([])
    }
  }

  const createFrequentationsAt = async (
    payload: any[], // Legacy format - will be transformed in service
    date: Dayjs
  ): Promise<boolean> => {
    try {
      const result = await FrequentationService.createFrequentations(payload)
      if (result && result.success) {
        await fetchDailyDataAt(date)
        return true
      }
      return false
    } catch (error) {
      console.error('Error creating frequentations:', error)
      return false
    }
  }

  const deleteFrequentationsAt = async (ids: number[], date: Dayjs): Promise<boolean> => {
    try {
      const result = await FrequentationService.deleteFrequentations(ids)
      if (result && result.success) {
        await fetchDailyDataAt(date)
        return true
      }
      return false
    } catch (error) {
      console.error('Error deleting frequentations:', error)
      return false
    }
  }

  return {
    students,
    frequentations,
    fetchDailyDataAt,
    createFrequentationsAt,
    deleteFrequentationsAt
  }
}
