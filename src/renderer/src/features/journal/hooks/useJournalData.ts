import type { Dayjs } from 'dayjs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FrequentationService from '../../../lib/api/frequentation.service'
import StudentService from '../../../lib/api/student.service'
import { frequentationHelpers } from '../../../lib/utils/frequentation.helpers'
import { studentHelpers } from '../../../lib/utils/student.helpers'
import { StudentViewModel, FrequentationViewModel } from '../../../types'
import type { CreateFrequentationPayload } from '../../../types/frequentation'

export function useJournalData(date: Dayjs): {
  students: StudentViewModel[]
  frequentations: FrequentationViewModel[]
  isLoading: boolean
  error: unknown
  createFrequentations: (payload: CreateFrequentationPayload[]) => Promise<boolean>
  deleteFrequentations: (ids: number[]) => Promise<boolean>
} {
  const queryClient = useQueryClient()
  const dateKey = date.format('YYYY-MM-DD')

  const { data, isLoading, error } = useQuery({
    queryKey: ['journal', dateKey],
    queryFn: async () => {
      const [studentRes, frequentationRes] = await Promise.all([
        StudentService.fetchStudentsWithoutFrequentationAt(dateKey),
        FrequentationService.fetchFrequentationsAt(dateKey)
      ])

      const studentViewModels = studentRes.data ? studentHelpers.toViewModels(studentRes.data) : []
      const frequentationViewModels = frequentationRes.data
        ? frequentationHelpers.toViewModels(frequentationRes.data)
        : []

      return {
        students: studentViewModels,
        frequentations: frequentationViewModels
      }
    }
  })
  const createMutation = useMutation({
    mutationFn: async (payload: CreateFrequentationPayload[]) => {
      const result = await FrequentationService.createFrequentations(payload)
      if (!result.success) throw new Error(result.error || 'Failed to create frequentations')
      return result
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['journal', dateKey] })
  })

  const deleteMutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const result = await FrequentationService.deleteFrequentations(ids)
      if (!result.success) throw new Error(result.error || 'Failed to delete frequentations')
      return result
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['journal', dateKey] })
  })

  const createFrequentations = async (payload: CreateFrequentationPayload[]): Promise<boolean> => {
    try {
      await createMutation.mutateAsync(payload)
      return true
    } catch (error) {
      console.error('Error creating frequentations:', error)
      return false
    }
  }

  const deleteFrequentations = async (ids: number[]): Promise<boolean> => {
    try {
      await deleteMutation.mutateAsync(ids)
      return true
    } catch (error) {
      console.error('Error deleting frequentations:', error)
      return false
    }
  }

  return {
    students: data?.students || [],
    frequentations: data?.frequentations || [],
    isLoading,
    error,
    createFrequentations,
    deleteFrequentations
  }
}
