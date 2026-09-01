import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { UpdateBannerView } from '../UpdateBannerView'
import type { UpdateBannerViewProps } from '../types/UpdateBannerViewProps'

const PROGRESS_PERCENT_42 = 42

function renderWithStatus(
  props: Omit<UpdateBannerViewProps, 'fillPercent' | 'percentDisplay'> &
    Partial<Pick<UpdateBannerViewProps, 'fillPercent' | 'percentDisplay'>>
) {
  return render(
    <I18nextProvider i18n={i18n}>
      <UpdateBannerView fillPercent={0} percentDisplay="0" {...props} />
    </I18nextProvider>
  )
}

describe('UpdateBannerView', () => {
  it('renders nothing for idle status', () => {
    const { container } = renderWithStatus({
      status: 'idle',
      onInstall: vi.fn(),
      onDismiss: vi.fn()
    })
    expect(container.firstChild).toBeNull()
  })

  it('renders the available message with version', () => {
    renderWithStatus({
      status: 'available',
      versionAvailable: '2.0.0',
      onInstall: vi.fn(),
      onDismiss: vi.fn()
    })
    expect(screen.getByText(/2\.0\.0/)).toBeInTheDocument()
  })

  it('renders the downloading message with percent', () => {
    renderWithStatus({
      status: 'downloading',
      percentDisplay: String(PROGRESS_PERCENT_42),
      onInstall: vi.fn(),
      onDismiss: vi.fn()
    })
    expect(screen.getByText(/42/)).toBeInTheDocument()
  })

  it('renders the downloaded message and install button', async () => {
    const onInstall = vi.fn()
    renderWithStatus({
      status: 'downloaded',
      versionDownloaded: '2.0.0',
      onInstall,
      onDismiss: vi.fn()
    })
    await userEvent.click(screen.getByRole('button', { name: /Redémarrer/i }))
    expect(onInstall).toHaveBeenCalledTimes(1)
  })

  it('renders error message', () => {
    renderWithStatus({
      status: 'error',
      errorMessage: 'network failure',
      onInstall: vi.fn(),
      onDismiss: vi.fn()
    })
    expect(screen.getByText(/network failure/)).toBeInTheDocument()
  })
})
