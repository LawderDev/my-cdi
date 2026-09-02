import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { studentKeys } from '../studentKeys'
import { statisticsKeys } from '@statistics/api/statisticsKeys'
import type { CreateStudentDto, UpdateStudentDto, ImportStudentsCsvPayload } from '@student-shared'

interface DeleteStudentInput {
  id: number
}

interface UpdateStudentInput {
  id: number
  data: UpdateStudentDto
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (dto: CreateStudentDto) => {
      const result = await window.electronAPI.student.create(dto)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
      queryClient.invalidateQueries({ queryKey: statisticsKeys.all })
    }
  })
}

export function useUpdateStudent() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (input: UpdateStudentInput) => {
      const result = await window.electronAPI.student.update({ id: input.id, ...input.data })
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
      queryClient.invalidateQueries({ queryKey: statisticsKeys.all })
    }
  })
}

interface UseDeleteStudentOptions {
  onSuccess?: () => void
}

export function useDeleteStudent(options: UseDeleteStudentOptions = {}) {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (input: DeleteStudentInput) => {
      const result = await window.electronAPI.student.delete(input)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
      queryClient.invalidateQueries({ queryKey: statisticsKeys.all })
      options.onSuccess?.()
    }
  })
}

export function useImportStudentsCsv() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (input: ImportStudentsCsvPayload) => {
      const result = await window.electronAPI.student.importCsv(input)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
      queryClient.invalidateQueries({ queryKey: statisticsKeys.all })
    }
  })
}
