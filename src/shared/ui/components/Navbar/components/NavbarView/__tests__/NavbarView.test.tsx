import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ROUTES } from '@lib/routes'
import { NavbarView } from '../NavbarView'

const NAV_ITEMS_STUB = [
  { path: ROUTES.JOURNAL, labelKey: 'nav.journal' },
  { path: ROUTES.STUDENTS, labelKey: 'nav.students' },
  { path: ROUTES.STATISTICS, labelKey: 'nav.statistics' }
] as const

beforeEach(() => {
  Object.defineProperty(window, 'electronAPI', {
    configurable: true,
    value: {
      getAppVersion: vi.fn().mockResolvedValue('')
    }
  })
})

describe('NavbarView', () => {
  it('renders all nav items with translated labels', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <NavbarView items={[...NAV_ITEMS_STUB]} activePath={ROUTES.JOURNAL} onNavigate={vi.fn()} />
      </I18nextProvider>
    )
    expect(screen.getByRole('button', { name: /Journal/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Élèves/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Statistiques/i })).toBeInTheDocument()
  })

  it('marks the active item as selected', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <NavbarView items={[...NAV_ITEMS_STUB]} activePath={ROUTES.STUDENTS} onNavigate={vi.fn()} />
      </I18nextProvider>
    )
    const studentsButton = screen.getByRole('button', { name: /Élèves/i })
    expect(studentsButton).toHaveAttribute('aria-current', 'page')
  })

  it('calls onNavigate with the path when an item is clicked', async () => {
    const onNavigate = vi.fn()
    render(
      <I18nextProvider i18n={i18n}>
        <NavbarView
          items={[...NAV_ITEMS_STUB]}
          activePath={ROUTES.JOURNAL}
          onNavigate={onNavigate}
        />
      </I18nextProvider>
    )
    await userEvent.click(screen.getByRole('button', { name: /Statistiques/i }))
    expect(onNavigate).toHaveBeenCalledWith(ROUTES.STATISTICS)
  })
})
