import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { resolveRouteTitle } from './helpers/resolveRouteTitle'

export function usePageTitle() {
  const location = useLocation()
  const { t } = useTranslation('common')

  useEffect(() => {
    const titleKey = resolveRouteTitle(location.pathname)
    document.title = t(titleKey)
  }, [location.pathname, t])
}
