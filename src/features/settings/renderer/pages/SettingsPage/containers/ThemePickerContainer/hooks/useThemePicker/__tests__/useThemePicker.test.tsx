import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ACCENT_COLORS } from '@ui/theme'
import { DEFAULT_THEME_PREFERENCE } from '@types'
import { useThemePicker } from '../useThemePicker'

const ACCENT_COUNT = 5

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

function stubElectronApi(storedPreference: object) {
  let stored = storedPreference
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

describe('useThemePicker', () => {
  beforeEach(() => {
    stubElectronApi(DEFAULT_THEME_PREFERENCE)
  })

  it('exposes one accent option per supported accent', async () => {
    const { result } = renderHook(() => useThemePicker(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.accentOptions).toHaveLength(ACCENT_COUNT))
    expect(result.current.accentOptions.map((option) => option.key)).toEqual([
      'purple',
      'pink',
      'blue',
      'red',
      'yellow'
    ])
  })

  it('labels the options through the active locale', async () => {
    const { result } = renderHook(() => useThemePicker(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.modeOptions).toHaveLength(2))
    expect(result.current.accentOptions[0]?.label).toBe('Violet')
    expect(result.current.modeOptions.map((option) => option.label)).toEqual(['Sombre', 'Clair'])
  })

  it('marks only the active accent and mode as active', async () => {
    stubElectronApi({ accent: 'pink', mode: 'light' })
    const { result } = renderHook(() => useThemePicker(), { wrapper: makeWrapper() })

    await waitFor(() =>
      expect(
        result.current.accentOptions.filter((option) => option.isActive).map((o) => o.key)
      ).toEqual(['pink'])
    )

    const activeModes = result.current.modeOptions.filter((option) => option.isActive)
    expect(activeModes.map((option) => option.key)).toEqual(['light'])
  })

  it('uses the accent main color as the swatch', async () => {
    const { result } = renderHook(() => useThemePicker(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.accentOptions).toHaveLength(ACCENT_COUNT))
    for (const option of result.current.accentOptions) {
      expect(option.swatch).toBe(ACCENT_COLORS[option.key].dark.main)
    }
  })

  it('keeps the current mode when selecting an accent', async () => {
    const { result } = renderHook(() => useThemePicker(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.accentOptions).toHaveLength(ACCENT_COUNT))
    const pink = result.current.accentOptions.find((option) => option.key === 'pink')
    if (pink) {
      act(() => {
        pink.onSelect()
      })
    }

    await waitFor(() =>
      expect(window.electronAPI.settings.setTheme).toHaveBeenCalledWith({
        accent: 'pink',
        mode: 'dark'
      })
    )
  })

  it('keeps the current accent when selecting a mode', async () => {
    const { result } = renderHook(() => useThemePicker(), { wrapper: makeWrapper() })

    await waitFor(() => expect(result.current.modeOptions).toHaveLength(2))
    const light = result.current.modeOptions.find((option) => option.key === 'light')
    if (light) {
      act(() => {
        light.onSelect()
      })
    }

    await waitFor(() =>
      expect(window.electronAPI.settings.setTheme).toHaveBeenCalledWith({
        accent: 'purple',
        mode: 'light'
      })
    )
  })
})
