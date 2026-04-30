import { useMutation, useQueryClient } from '@tanstack/react-query'
import { frequentationKeys } from '@frequentation/api/frequentationKeys'
import type { ActivityType } from '@types'

interface UseBatchUpdateActivityOptions {
  onSuccess?: () => void
}

interface BatchUpdateActivityInput {
  ids: number[]
  activity: ActivityType
}

export function useBatchUpdateActivity({ onSuccess }: UseBatchUpdateActivityOptions = {}) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ ids, activity }: BatchUpdateActivityInput) => {
      for (const id of ids) {
        const result = await window.electronAPI.frequentation.update({ id, activity })
        if (!result.success) {
          throw new Error(result.error ?? 'Erreur lors de la mise à jour')
        }
      }
      return { updatedCount: ids.length }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentationKeys.all })
      onSuccess?.()
    }
  })
}
