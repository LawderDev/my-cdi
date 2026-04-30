import { useMutation, useQueryClient } from '@tanstack/react-query'
import { frequentationKeys } from '@frequentation/api/frequentationKeys'

interface UseBatchDeleteOptions {
  onSuccess?: () => void
}

export function useBatchDelete({ onSuccess }: UseBatchDeleteOptions = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ids: number[]) => {
      for (const id of ids) {
        const result = await window.electronAPI.frequentation.delete({ id })
        if (!result.success) {
          throw new Error(result.error ?? 'Erreur lors de la suppression')
        }
      }
      return { deletedCount: ids.length }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentationKeys.all })
      onSuccess?.()
    }
  })
}
