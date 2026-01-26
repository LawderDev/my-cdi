import { Dayjs } from 'dayjs'
import type { StudentViewModel } from '../types/view.models'
import type { CreateFrequentationPayload } from '../types/frequentation'
import type { UpdateFrequentationDto } from '@shared/types'
import FrequentationService from '../services/frequentation.service'
interface UseFrequentationActionsParams {
  createFrequentationsAt: (
    frequentations: CreateFrequentationPayload[],
    date: Dayjs
  ) => Promise<boolean>
  deleteFrequentationsAt: (ids: number[], date: Dayjs) => Promise<boolean>
  selectedDate: Dayjs
}

export const useFrequentationActions = ({
  createFrequentationsAt,
  deleteFrequentationsAt,
  selectedDate
}: UseFrequentationActionsParams): {
  createFrequentation: (studentsToCreate: StudentViewModel[], activity: string) => Promise<boolean>
  deleteFrequentation: (ids: number[], date: Dayjs) => Promise<boolean>
  updateFrequentation: (id: number, data: UpdateFrequentationDto) => Promise<boolean>
} => {
  const createFrequentation = async (
    studentsToCreate: StudentViewModel[],
    activity: string = 'work'
  ): Promise<boolean> => {
    const frequentationsPayload = studentsToCreate.map((student) => ({
      startsAt: selectedDate.toISOString(),
      activity: activity,
      studentId: student.id
    }))

    const result = await createFrequentationsAt(frequentationsPayload, selectedDate)
    return result
  }

  const deleteFrequentation = async (ids: number[], date: Dayjs): Promise<boolean> => {
    const result = await deleteFrequentationsAt(ids, date)
    return result
  }

  const updateFrequentation = async (
    id: number,
    data: UpdateFrequentationDto
  ): Promise<boolean> => {
    try {
      const result = await FrequentationService.update(id, data)
      return result.success
    } catch (error) {
      console.error('Error updating frequentation:', error)
      return false
    }
  }

  return {
    createFrequentation,
    deleteFrequentation,
    updateFrequentation
  }
}
