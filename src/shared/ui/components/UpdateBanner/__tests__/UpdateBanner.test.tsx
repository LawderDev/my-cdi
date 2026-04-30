import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { UpdateBanner } from '../UpdateBanner'

type Listener<T> = (payload: T) => void
let availableListener: Listener<unknown> | null = null

beforeEach(() => {
  availableListener = null
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
        onDownloadProgress: () => () => {},
        onUpdateDownloaded: () => () => {},
        onUpdateError: () => () => {},
        checkForUpdates: vi.fn(),
        quitAndInstall: vi.fn()
      }
    }
  })
})

describe('UpdateBanner', () => {
  it('renders nothing initially', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <UpdateBanner />
      </I18nextProvider>
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders the available banner when an update is announced', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <UpdateBanner />
      </I18nextProvider>
    )
    act(() => {
      availableListener?.({ version: '9.9.9' })
    })
    expect(screen.getByText(/9\.9\.9/)).toBeInTheDocument()
  })
})
