import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useSetThemePreference } from '../useSetThemePreference'
import { useThemePreference } from '../../useThemePreference'
import { themeKeys } from '../../themeKeys'
import { DEFAULT_THEME_PREFERENCE } from '@types'

const PINK_LIGHT = { accent: 'pink', mode: 'light' } as const

function setupClient() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })
  queryClient.setQueryData([...themeKeys.preference()], DEFAULT_THEME_PREFERENCE)
  return queryClient
}

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
}

describe('useSetThemePreference', () => {
  beforeEach(() => {
    vi.stubGlobal('electronAPI', {
      settings: {
        getTheme: vi.fn().mockResolvedValue({ success: true, data: PINK_LIGHT }),
        setTheme: vi.fn().mockResolvedValue({ success: true, data: PINK_LIGHT })
      },
      getInitialThemePreference: vi.fn().mockReturnValue(DEFAULT_THEME_PREFERENCE)
    })
  })

  it('optimistically switches the cached preference before the ipc call resolves', async () => {
    let resolveSetTheme: (value: { success: boolean; data?: unknown }) => void = () => {}
    vi.stubGlobal('electronAPI', {
      settings: {
        getTheme: vi.fn().mockResolvedValue({ success: true, data: PINK_LIGHT }),
        setTheme: vi.fn().mockImplementation(
          () =>
            new Promise((resolve) => {
              resolveSetTheme = resolve
            })
        )
      },
      getInitialThemePreference: vi.fn().mockReturnValue(DEFAULT_THEME_PREFERENCE)
    })
    const queryClient = setupClient()
    const wrapper = createWrapper(queryClient)

    const { result } = renderHook(() => useSetThemePreference(), { wrapper })

    result.current.mutate(PINK_LIGHT)
    await waitFor(() => expect(window.electronAPI.settings.setTheme).toHaveBeenCalled())

    expect(queryClient.getQueryData([...themeKeys.preference()])).toEqual(PINK_LIGHT)

    resolveSetTheme({ success: true, data: PINK_LIGHT })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
  })

  it('rolls back to the previous preference when the ipc call fails', async () => {
    vi.stubGlobal('electronAPI', {
      settings: {
        getTheme: vi.fn().mockResolvedValue({ success: true, data: DEFAULT_THEME_PREFERENCE }),
        setTheme: vi.fn().mockResolvedValue({ success: false, error: 'db locked' })
      },
      getInitialThemePreference: vi.fn().mockReturnValue(DEFAULT_THEME_PREFERENCE)
    })
    const queryClient = setupClient()
    const wrapper = createWrapper(queryClient)

    const { result } = renderHook(() => useSetThemePreference(), { wrapper })

    result.current.mutate(PINK_LIGHT)

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(queryClient.getQueryData([...themeKeys.preference()])).toEqual(DEFAULT_THEME_PREFERENCE)
  })

  it('reads back the persisted preference through useThemePreference after the update', async () => {
    const queryClient = setupClient()
    const wrapper = createWrapper(queryClient)

    const { result: mutation } = renderHook(() => useSetThemePreference(), { wrapper })
    const { result: query } = renderHook(() => useThemePreference(), { wrapper })

    mutation.current.mutate(PINK_LIGHT)

    await waitFor(() => expect(mutation.current.isSuccess).toBe(true))
    await waitFor(() => expect(query.current.data).toEqual(PINK_LIGHT))
  })
})
