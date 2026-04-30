import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { resolvePageTitle } from '../../helpers/resolvePageTitle'
import { useClock } from '../useClock'

export interface UseHeaderReturn {
  title: string
  subtitle: string
  time: string
}

export function useHeader(): UseHeaderReturn {
  const location = useLocation()
  const { t } = useTranslation('common')
  const { titleKey, subtitleKey } = resolvePageTitle(location.pathname)
  const { time } = useClock()

  return {
    title: t(titleKey),
    subtitle: t(subtitleKey),
    time
  }
}
