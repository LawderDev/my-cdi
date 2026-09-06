import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { themeKeys } from '../themeKeys'
import type { ThemePreference } from '@types'
import type { UpdateThemePreferenceDto } from '@settings-shared'

interface SetThemePreferenceContext {
  previous: ThemePreference | undefined
}

export function useSetThemePreference() {
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: async (preference: UpdateThemePreferenceDto) => {
      const result = await window.electronAPI.settings.setTheme(preference)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    onMutate: async (preference) => {
      await queryClient.cancelQueries({ queryKey: themeKeys.all })
      const previous = queryClient.getQueryData<ThemePreference>([...themeKeys.preference()])
      queryClient.setQueryData([...themeKeys.preference()], preference)
      return { previous } satisfies SetThemePreferenceContext
    },
    onError: (_error, _preference, context) => {
      if (context?.previous) {
        queryClient.setQueryData([...themeKeys.preference()], context.previous)
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: themeKeys.all })
    }
  })
}
