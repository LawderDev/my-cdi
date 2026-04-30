import { useMutation, useQueryClient } from '@tanstack/react-query'
import { studentKeys } from '@student/api/studentKeys'

const DEFAULT_ERROR_MESSAGE = 'Erreur lors de la suppression'

interface UseBatchDeleteOptions {
  onSuccess?: () => void
}

interface BatchDeleteResult {
  deletedCount: number
}

export function useBatchDelete({ onSuccess }: UseBatchDeleteOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (ids: number[]): Promise<BatchDeleteResult> => {
      for (const id of ids) {
        const result = await window.electronAPI.student.delete({ id })
        if (!result.success) {
          throw new Error(result.error ?? DEFAULT_ERROR_MESSAGE)
        }
      }
      return { deletedCount: ids.length }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all })
      onSuccess?.()
    }
  })
}
