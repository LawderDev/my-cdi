import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useThemePreference } from '../useThemePreference'
import { DEFAULT_THEME_PREFERENCE } from '@types'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useThemePreference', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      settings: {
        getTheme: vi.fn().mockResolvedValue({
          success: true,
          data: { accent: 'pink', mode: 'light' }
        })
      },
      getInitialThemePreference: vi.fn().mockReturnValue(DEFAULT_THEME_PREFERENCE)
    })
  })

  it('starts with the initial preference from the preload handoff', async () => {
    const { result } = renderHook(() => useThemePreference(), { wrapper: createWrapper() })

    expect(result.current.data).toEqual(DEFAULT_THEME_PREFERENCE)

    await waitFor(() => expect(result.current.data).toEqual({ accent: 'pink', mode: 'light' }))
  })

  it('fetches the stored preference from ipc', async () => {
    const { result } = renderHook(() => useThemePreference(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.data).toEqual({ accent: 'pink', mode: 'light' }))
    expect(window.electronAPI.settings.getTheme).toHaveBeenCalled()
  })

  it('throws when the ipc result indicates failure', async () => {
    vi.stubGlobal('electronAPI', {
      settings: {
        getTheme: vi.fn().mockResolvedValue({ success: false, error: 'boom' })
      },
      getInitialThemePreference: vi.fn().mockReturnValue(DEFAULT_THEME_PREFERENCE)
    })

    const { result } = renderHook(() => useThemePreference(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeInstanceOf(Error)
  })
})
