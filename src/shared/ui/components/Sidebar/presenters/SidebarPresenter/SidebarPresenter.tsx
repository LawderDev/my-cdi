import { useTranslation } from 'react-i18next'
import { NavButton } from './components/NavButton'
import type { SidebarPresenterProps } from './types/SidebarPresenterProps'
import {
  FooterList,
  Logo,
  NavList,
  SETTINGS_ICON_NAME,
  SETTINGS_LABEL_KEY,
  SidebarRoot
} from './SidebarPresenter.styles'

export function SidebarPresenter({
  navButtonNodes,
  isSettingsActive,
  onSettingsClick
}: SidebarPresenterProps) {
  const { t } = useTranslation('common')

  return (
    <SidebarRoot as="nav">
      <Logo>CDI</Logo>
      <NavList>{navButtonNodes}</NavList>
      <FooterList>
        <NavButton
          active={isSettingsActive}
          iconName={SETTINGS_ICON_NAME}
          label={t(SETTINGS_LABEL_KEY)}
          onClick={onSettingsClick}
        />
      </FooterList>
    </SidebarRoot>
  )
}
