import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { studentKeys } from '@student/api/studentKeys'

interface UseBatchDeleteOptions {
  onSuccess?: () => void
}

interface BatchDeleteResult {
  deletedCount: number
}

export function useBatchDelete({ onSuccess }: UseBatchDeleteOptions = {}) {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')

  return useMutation({
    mutationFn: async (ids: number[]): Promise<BatchDeleteResult> => {
      for (const id of ids) {
        const result = await window.electronAPI.student.delete({ id })
        if (!result.success) {
          throw new Error(resolveIpcErrorMessage(result, t))
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
