import { Dayjs } from 'dayjs'
import { useQueryClient } from '@tanstack/react-query'
import type { StudentViewModel } from '../../../types/view.models'
import type { CreateFrequentationPayload } from '../../../types/frequentation'
import type { UpdateFrequentationDto } from '@shared/types'
import FrequentationService from '../../../lib/api/frequentation.service'
interface UseFrequentationActionsParams {
  createFrequentations: (frequentations: CreateFrequentationPayload[]) => Promise<boolean>
  deleteFrequentations: (ids: number[]) => Promise<boolean>
  selectedDate: Dayjs
}

export const useFrequentationActions = ({
  createFrequentations,
  deleteFrequentations,
  selectedDate
}: UseFrequentationActionsParams): {
  createFrequentation: (studentsToCreate: StudentViewModel[], activity: string) => Promise<boolean>
  deleteFrequentation: (ids: number[]) => Promise<boolean>
  updateFrequentation: (id: number, data: UpdateFrequentationDto) => Promise<boolean>
} => {
  const queryClient = useQueryClient()
  const dateKey = selectedDate.format('YYYY-MM-DD')
  const createFrequentation = async (
    studentsToCreate: StudentViewModel[],
    activity: string = 'work'
  ): Promise<boolean> => {
    const frequentationsPayload = studentsToCreate.map((student) => ({
      startsAt: selectedDate.toISOString(),
      activity: activity,
      studentId: student.id
    }))

    const result = await createFrequentations(frequentationsPayload)
    return result
  }

  const deleteFrequentation = async (ids: number[]): Promise<boolean> => {
    const result = await deleteFrequentations(ids)
    return result
  }

  const updateFrequentation = async (
    id: number,
    data: UpdateFrequentationDto
  ): Promise<boolean> => {
    try {
      const result = await FrequentationService.update(id, data)
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['journal', dateKey] })
        return true
      } else {
        console.error('Update failed:', result.error)
        return false
      }
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
