import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useTranslation } from 'react-i18next'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ROUTES } from '@lib/routes'
import { SidebarView } from '../SidebarView'
import { NavButton } from '../components/NavButton'
import { buildSidebarItems } from '../../../helpers/buildSidebarItems'

function Harness(props: { onStatisticsClick: () => void; onSettingsClick: () => void }) {
  const { t } = useTranslation('common')
  const navButtonNodes = buildSidebarItems().map((item) => (
    <NavButton
      key={item.path}
      active={false}
      iconName={item.iconName}
      label={t(item.labelKey)}
      onClick={item.path === ROUTES.STATISTICS ? props.onStatisticsClick : () => undefined}
    />
  ))

  return <SidebarView navButtonNodes={navButtonNodes} onSettingsClick={props.onSettingsClick} />
}

function renderView() {
  const onNavigate = vi.fn()
  const onSettingsClick = vi.fn()
  render(
    <I18nextProvider i18n={i18n}>
      <Harness onStatisticsClick={onNavigate} onSettingsClick={onSettingsClick} />
    </I18nextProvider>
  )
  return { onNavigate, onSettingsClick }
}

describe('SidebarView', () => {
  it('renders the CDI logo and three nav items + settings button', () => {
    renderView()
    expect(screen.getByText('CDI')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Journal/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Statistiques/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Liste des élèves/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Paramètres/i })).toBeInTheDocument()
  })

  it('invokes the clicked item onClick', async () => {
    const { onNavigate } = renderView()
    await userEvent.click(screen.getByRole('button', { name: /Statistiques/i }))
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })

  it('calls onSettingsClick when the settings button is clicked', async () => {
    const { onSettingsClick } = renderView()
    await userEvent.click(screen.getByRole('button', { name: /Paramètres/i }))
    expect(onSettingsClick).toHaveBeenCalledTimes(1)
  })
})
