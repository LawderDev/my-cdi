import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { ROUTES } from '@lib/routes'
import { buildSidebarItems } from '../../helpers/buildSidebarItems'
import { NavButton } from '../../components/SidebarPresenter/components/NavButton'

const SETTINGS_PLACEHOLDER_HASH = '#'

export interface UseSidebarReturn {
  navButtonNodes: ReactNode[]
  onSettingsClick: () => void
}

function resolveActivePath(pathname: string): string {
  if (pathname.startsWith(ROUTES.STATISTICS)) {
    return ROUTES.STATISTICS
  }
  if (pathname.startsWith(ROUTES.STUDENTS)) {
    return ROUTES.STUDENTS
  }
  return ROUTES.JOURNAL
}

export function useSidebar(): UseSidebarReturn {
  const reactNavigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('common')
  const activePath = resolveActivePath(location.pathname)

  const navButtonNodes: ReactNode[] = buildSidebarItems().map((item) => {
    const isActive = item.path === activePath
    return (
      <NavButton
        key={item.path}
        active={isActive}
        iconName={item.iconName}
        label={t(item.labelKey)}
        ariaCurrent={isActive ? 'page' : undefined}
        onClick={() => {
          reactNavigate(item.path)
        }}
      />
    )
  })

  function handleSettingsClick() {
    window.location.hash = SETTINGS_PLACEHOLDER_HASH
  }

  return { navButtonNodes, onSettingsClick: handleSettingsClick }
}
