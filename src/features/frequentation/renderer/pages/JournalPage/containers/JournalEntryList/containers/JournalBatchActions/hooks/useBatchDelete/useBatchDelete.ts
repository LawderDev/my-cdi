import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { frequentationKeys } from '@frequentation/api/frequentationKeys'

interface UseBatchDeleteOptions {
  onSuccess?: () => void
}

export function useBatchDelete({ onSuccess }: UseBatchDeleteOptions = {}) {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (ids: number[]) => {
      for (const id of ids) {
        const result = await window.electronAPI.frequentation.delete({ id })
        if (!result.success) {
          throw new Error(resolveIpcErrorMessage(result, t))
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
