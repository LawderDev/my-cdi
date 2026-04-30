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

describe('AppShell', () => {
  it('renders the navbar and outlet content', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[ROUTES.STUDENTS]}>
          <Routes>
            <Route element={<AppShell />}>
              <Route path={ROUTES.STUDENTS} element={<ProbeStudents />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    )
    expect(screen.getByRole('button', { name: /Élèves/i })).toBeInTheDocument()
    expect(screen.getByTestId('students-probe')).toBeInTheDocument()
  })

  it('updates document.title via the page title hook', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[ROUTES.STUDENTS]}>
          <Routes>
            <Route element={<AppShell />}>
              <Route path={ROUTES.STUDENTS} element={<ProbeStudents />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    )
    expect(document.title).toBe('Élèves — Mon CDI')
  })
})
