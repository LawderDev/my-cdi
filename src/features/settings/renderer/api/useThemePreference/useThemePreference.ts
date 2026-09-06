import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { themeKeys } from '../themeKeys'
import type { ThemePreference } from '@types'

export function useThemePreference() {
  const { t } = useTranslation('common')
  return useQuery({
    queryKey: [...themeKeys.preference()],
    queryFn: async (): Promise<ThemePreference> => {
      const result = await window.electronAPI.settings.getTheme()
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    initialData: () => window.electronAPI.getInitialThemePreference()
  })
}
