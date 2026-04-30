import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ROUTES } from '@lib/routes'
import { SidebarView } from '../SidebarView'
import { buildSidebarItems } from '../../../helpers/buildSidebarItems'

const items = buildSidebarItems()

function renderView(activePath: string) {
  const onNavigate = vi.fn()
  const onSettingsClick = vi.fn()
  render(
    <I18nextProvider i18n={i18n}>
      <SidebarView
        items={items}
        activePath={activePath}
        onNavigate={onNavigate}
        onSettingsClick={onSettingsClick}
      />
    </I18nextProvider>
  )
  return { onNavigate, onSettingsClick }
}

describe('SidebarView', () => {
  it('renders the CDI logo and three nav items + settings button', () => {
    renderView(ROUTES.JOURNAL)
    expect(screen.getByText('CDI')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Journal/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Statistiques/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Liste des élèves/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Paramètres/i })).toBeInTheDocument()
  })

  it('marks the active item with aria-current="page"', () => {
    renderView(ROUTES.STATISTICS)
    expect(screen.getByRole('button', { name: /Statistiques/i })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('button', { name: /Journal/i })).not.toHaveAttribute('aria-current')
  })

  it('calls onNavigate with the clicked item path', async () => {
    const { onNavigate } = renderView(ROUTES.JOURNAL)
    await userEvent.click(screen.getByRole('button', { name: /Statistiques/i }))
    expect(onNavigate).toHaveBeenCalledWith(ROUTES.STATISTICS)
  })

  it('calls onSettingsClick when the settings button is clicked', async () => {
    const { onSettingsClick } = renderView(ROUTES.JOURNAL)
    await userEvent.click(screen.getByRole('button', { name: /Paramètres/i }))
    expect(onSettingsClick).toHaveBeenCalledTimes(1)
  })
})
