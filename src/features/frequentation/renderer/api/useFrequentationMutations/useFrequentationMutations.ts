import { useMutation, useQueryClient } from '@tanstack/react-query'
import { frequentationKeys } from '../frequentationKeys'
import type { CreateFrequentationBatchDto, UpdateFrequentationDto } from '@frequentation-shared'

export function useCreateFrequentationBatch() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (dto: CreateFrequentationBatchDto) => {
      const result = await window.electronAPI.frequentation.createBatch(dto)
      if (!result.success) {
        throw new Error(result.error ?? 'Erreur lors de la création')
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentationKeys.all })
    }
  })
}

export function useUpdateFrequentation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: { id: number } & UpdateFrequentationDto) => {
      const result = await window.electronAPI.frequentation.update(input)
      if (!result.success) {
        throw new Error(result.error ?? 'Erreur lors de la mise à jour')
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentationKeys.all })
    }
  })
}

interface UseDeleteFrequentationOptions {
  onSuccess?: () => void
}

export function useDeleteFrequentation(options: UseDeleteFrequentationOptions = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: { id: number }) => {
      const result = await window.electronAPI.frequentation.delete(input)
      if (!result.success) {
        throw new Error(result.error ?? 'Erreur lors de la suppression')
      }
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentationKeys.all })
      options.onSuccess?.()
    }
  })
}
