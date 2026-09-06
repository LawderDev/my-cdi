import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { ROUTES } from '@lib/routes'
import { buildSidebarItems } from '../../helpers/buildSidebarItems'
import { NavButton } from '../../presenters/SidebarPresenter/components/NavButton'

export interface UseSidebarReturn {
  navButtonNodes: ReactNode[]
  isSettingsActive: boolean
  onSettingsClick: () => void
}

function resolveActivePath(pathname: string): string {
  if (pathname.startsWith(ROUTES.STATISTICS)) {
    return ROUTES.STATISTICS
  }
  if (pathname.startsWith(ROUTES.STUDENTS)) {
    return ROUTES.STUDENTS
  }
  if (pathname.startsWith(ROUTES.SETTINGS)) {
    return ROUTES.SETTINGS
  }
  return ROUTES.JOURNAL
}

export function useSidebar(): UseSidebarReturn {
  const reactNavigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation('common')
  const activePath = resolveActivePath(location.pathname)
  const isSettingsActive = activePath === ROUTES.SETTINGS

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
    reactNavigate(ROUTES.SETTINGS)
  }

  return { navButtonNodes, isSettingsActive, onSettingsClick: handleSettingsClick }
}
