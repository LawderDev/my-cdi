import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { DEFAULT_THEME_PREFERENCE } from '@types'
import { SettingsPage } from '../SettingsPage'

function makeWrapper() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </QueryClientProvider>
    )
  }
}

const ACCENT_COUNT = 5
const MODE_OPTION_COUNT = 2

function stubStatefulThemeApi() {
  let stored: object = DEFAULT_THEME_PREFERENCE
  vi.stubGlobal('electronAPI', {
    settings: {
      getTheme: vi.fn().mockImplementation(async () => ({ success: true, data: stored })),
      setTheme: vi.fn().mockImplementation(async (preference: object) => {
        stored = preference
        return { success: true, data: preference }
      })
    },
    getInitialThemePreference: vi.fn().mockReturnValue(DEFAULT_THEME_PREFERENCE)
  })
}

describe('SettingsPage', () => {
  beforeEach(() => {
    stubStatefulThemeApi()
  })

  it('renders the appearance section with accent and mode pickers', () => {
    render(<SettingsPage />, { wrapper: makeWrapper() })

    expect(screen.getByText('Apparence')).toBeInTheDocument()
    expect(screen.getByText("Couleur d'accent")).toBeInTheDocument()
    expect(screen.getByText("Mode d'affichage")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Violet' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Rose' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bleu' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Rouge' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Jaune' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sombre' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clair' })).toBeInTheDocument()
  })

  it('renders every accent swatch and both mode options', () => {
    render(<SettingsPage />, { wrapper: makeWrapper() })

    const accentButtons = ['Violet', 'Rose', 'Bleu', 'Rouge', 'Jaune'].map((name) =>
      screen.getByRole('button', { name })
    )
    expect(accentButtons).toHaveLength(ACCENT_COUNT)
    expect(screen.getAllByRole('button', { name: /^(Sombre|Clair)$/ })).toHaveLength(
      MODE_OPTION_COUNT
    )
    expect(screen.getByRole('button', { name: 'Sombre' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: 'Clair' })).toHaveAttribute('data-active', 'false')
  })

  it('switches to pink and light when the user picks them', async () => {
    render(<SettingsPage />, { wrapper: makeWrapper() })

    await userEvent.click(screen.getByRole('button', { name: 'Rose' }))
    await userEvent.click(screen.getByRole('button', { name: 'Clair' }))

    await waitFor(() => {
      expect(window.electronAPI.settings.setTheme).toHaveBeenCalledWith({
        accent: 'pink',
        mode: 'light'
      })
    })
    expect(screen.getByRole('button', { name: 'Rose' })).toHaveAttribute('data-active', 'true')
    expect(screen.getByRole('button', { name: 'Clair' })).toHaveAttribute('data-active', 'true')
  })
})
