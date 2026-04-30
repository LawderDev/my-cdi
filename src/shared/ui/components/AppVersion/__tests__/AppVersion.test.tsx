import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AppVersion } from '../AppVersion'

const APP_VERSION_STUB = '1.2.3'

describe('AppVersion', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'electronAPI', {
      configurable: true,
      value: {
        getAppVersion: vi.fn().mockResolvedValue(APP_VERSION_STUB)
      }
    })
  })

  it('renders the app version after fetching', async () => {
    render(<AppVersion />)
    await waitFor(() => {
      expect(screen.getByText(`v${APP_VERSION_STUB}`)).toBeInTheDocument()
    })
  })

  it('renders nothing when version cannot be loaded', async () => {
    Object.defineProperty(window, 'electronAPI', {
      configurable: true,
      value: {
        getAppVersion: vi.fn().mockResolvedValue('')
      }
    })
    const { container } = render(<AppVersion />)
    await waitFor(() => {
      expect(container.firstChild).toBeNull()
    })
  })
})
