import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAutoUpdater } from '../useAutoUpdater'

type Listener<T> = (payload: T) => void

interface MockedUpdater {
  triggerAvailable: (payload: unknown) => void
  triggerProgress: (payload: unknown) => void
  triggerDownloaded: (payload: unknown) => void
  triggerError: (payload: unknown) => void
  quitAndInstall: ReturnType<typeof vi.fn>
}

const PROGRESS_PERCENT_HALF = 50
const PROGRESS_BYTES_PER_SECOND = 1000
const PROGRESS_TRANSFERRED = 500
const PROGRESS_TOTAL = 1000

let mocked: MockedUpdater

beforeEach(() => {
  let availableListener: Listener<unknown> | null = null
  let progressListener: Listener<unknown> | null = null
  let downloadedListener: Listener<unknown> | null = null
  let errorListener: Listener<unknown> | null = null
  const quitAndInstall = vi.fn()

  mocked = {
    triggerAvailable: (payload) => availableListener?.(payload),
    triggerProgress: (payload) => progressListener?.(payload),
    triggerDownloaded: (payload) => downloadedListener?.(payload),
    triggerError: (payload) => errorListener?.(payload),
    quitAndInstall
  }

  Object.defineProperty(window, 'electronAPI', {
    configurable: true,
    value: {
      getAppVersion: vi.fn().mockResolvedValue(''),
      updater: {
        onUpdateAvailable: (listener: Listener<unknown>) => {
          availableListener = listener
          return () => {
            availableListener = null
          }
        },
        onUpdateNotAvailable: () => () => {},
        onDownloadProgress: (listener: Listener<unknown>) => {
          progressListener = listener
          return () => {
            progressListener = null
          }
        },
        onUpdateDownloaded: (listener: Listener<unknown>) => {
          downloadedListener = listener
          return () => {
            downloadedListener = null
          }
        },
        onUpdateError: (listener: Listener<unknown>) => {
          errorListener = listener
          return () => {
            errorListener = null
          }
        },
        checkForUpdates: vi.fn(),
        quitAndInstall
      }
    }
  })
})

describe('useAutoUpdater', () => {
  it('starts in idle state', () => {
    const { result } = renderHook(() => useAutoUpdater())
    expect(result.current.status).toBe('idle')
  })

  it('transitions to available when update-available event fires', () => {
    const { result } = renderHook(() => useAutoUpdater())
    act(() => {
      mocked.triggerAvailable({ version: '2.0.0' })
    })
    expect(result.current.status).toBe('available')
    expect(result.current.availableInfo?.version).toBe('2.0.0')
  })

  it('transitions to downloading on progress events', () => {
    const { result } = renderHook(() => useAutoUpdater())
    act(() => {
      mocked.triggerProgress({
        percent: PROGRESS_PERCENT_HALF,
        bytesPerSecond: PROGRESS_BYTES_PER_SECOND,
        transferred: PROGRESS_TRANSFERRED,
        total: PROGRESS_TOTAL
      })
    })
    expect(result.current.status).toBe('downloading')
    expect(result.current.progress?.percent).toBe(PROGRESS_PERCENT_HALF)
  })

  it('transitions to downloaded when update-downloaded fires', () => {
    const { result } = renderHook(() => useAutoUpdater())
    act(() => {
      mocked.triggerDownloaded({ version: '2.0.0' })
    })
    expect(result.current.status).toBe('downloaded')
    expect(result.current.downloadedInfo?.version).toBe('2.0.0')
  })

  it('transitions to error on error event', () => {
    const { result } = renderHook(() => useAutoUpdater())
    act(() => {
      mocked.triggerError({ message: 'network failure' })
    })
    expect(result.current.status).toBe('error')
    expect(result.current.errorInfo?.message).toBe('network failure')
  })

  it('calls quitAndInstall on installNow', () => {
    const { result } = renderHook(() => useAutoUpdater())
    act(() => {
      result.current.installNow()
    })
    expect(mocked.quitAndInstall).toHaveBeenCalledTimes(1)
  })

  it('resets to idle on dismiss', () => {
    const { result } = renderHook(() => useAutoUpdater())
    act(() => {
      mocked.triggerAvailable({ version: '2.0.0' })
    })
    act(() => {
      result.current.dismiss()
    })
    expect(result.current.status).toBe('idle')
  })
})
