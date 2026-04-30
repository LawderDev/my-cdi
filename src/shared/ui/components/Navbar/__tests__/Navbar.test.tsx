import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ROUTES } from '@lib/routes'
import { Navbar } from '../Navbar'

function ProbePage({ label }: { label: string }) {
  return <div>{label}</div>
}

function renderAt(path: string) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[path]}>
        <Navbar />
        <Routes>
          <Route path={ROUTES.JOURNAL} element={<ProbePage label="journal-page" />} />
          <Route path={ROUTES.STUDENTS} element={<ProbePage label="students-page" />} />
          <Route path={ROUTES.STATISTICS} element={<ProbePage label="statistics-page" />} />
        </Routes>
      </MemoryRouter>
    </I18nextProvider>
  )
}

beforeEach(() => {
  Object.defineProperty(window, 'electronAPI', {
    configurable: true,
    value: {
      getAppVersion: vi.fn().mockResolvedValue('')
    }
  })
})

describe('Navbar', () => {
  it('renders nav items via the view', () => {
    renderAt(ROUTES.JOURNAL)
    expect(screen.getByRole('button', { name: /Journal/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Élèves/i })).toBeInTheDocument()
  })

  it('marks the journal item active when on journal route', () => {
    renderAt(ROUTES.JOURNAL)
    expect(screen.getByRole('button', { name: /Journal/i })).toHaveAttribute('aria-current', 'page')
  })

  it('navigates when an item is clicked', async () => {
    renderAt(ROUTES.JOURNAL)
    await userEvent.click(screen.getByRole('button', { name: /Statistiques/i }))
    expect(screen.getByText('statistics-page')).toBeInTheDocument()
  })
})
