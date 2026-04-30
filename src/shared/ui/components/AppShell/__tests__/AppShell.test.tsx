import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ROUTES } from '@lib/routes'
import { AppShell } from '../AppShell'

function ProbeStudents() {
  return <div data-testid="students-probe">students-probe</div>
}

beforeEach(() => {
  document.title = ''
  Object.defineProperty(window, 'electronAPI', {
    configurable: true,
    value: {
      getAppVersion: vi.fn().mockResolvedValue(''),
      updater: {
        onUpdateAvailable: () => () => {},
        onUpdateNotAvailable: () => () => {},
        onDownloadProgress: () => () => {},
        onUpdateDownloaded: () => () => {},
        onUpdateError: () => () => {},
        checkForUpdates: vi.fn(),
        quitAndInstall: vi.fn()
      }
    }
  })
})

function renderShell(initialPath: string = ROUTES.STUDENTS) {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path={ROUTES.STUDENTS} element={<ProbeStudents />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </I18nextProvider>
  )
}

describe('AppShell', () => {
  it('renders the sidebar, header and outlet content', () => {
    renderShell()
    // Sidebar nav buttons (3 + settings)
    expect(screen.getByRole('button', { name: /Journal/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Statistiques/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Liste des élèves/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Paramètres/i })).toBeInTheDocument()
    // Header banner
    expect(screen.getByRole('banner')).toBeInTheDocument()
    // Outlet content mounted
    expect(screen.getByTestId('students-probe')).toBeInTheDocument()
  })

  it('updates document.title via the page title hook', () => {
    renderShell()
    expect(document.title).toBe('Élèves — Mon CDI')
  })
})
