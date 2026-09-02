import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { frequentationKeys } from '../frequentationKeys'
import { statisticsKeys } from '@statistics/api/statisticsKeys'
import type { CreateFrequentationBatchDto, UpdateFrequentationDto } from '@frequentation-shared'

export function useCreateFrequentationBatch() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (dto: CreateFrequentationBatchDto) => {
      const result = await window.electronAPI.frequentation.createBatch(dto)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentationKeys.all })
      queryClient.invalidateQueries({ queryKey: statisticsKeys.all })
    }
  })
}

export function useUpdateFrequentation() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (input: { id: number } & UpdateFrequentationDto) => {
      const result = await window.electronAPI.frequentation.update(input)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentationKeys.all })
      queryClient.invalidateQueries({ queryKey: statisticsKeys.all })
    }
  })
}

interface UseDeleteFrequentationOptions {
  onSuccess?: () => void
}

export function useDeleteFrequentation(options: UseDeleteFrequentationOptions = {}) {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (input: { id: number }) => {
      const result = await window.electronAPI.frequentation.delete(input)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentationKeys.all })
      queryClient.invalidateQueries({ queryKey: statisticsKeys.all })
      options.onSuccess?.()
    }
  })
}
