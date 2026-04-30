import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ErrorBoundary } from '../ErrorBoundary'

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('boom-detonate')
  }
  return <div>safe-content</div>
}

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
          <Bomb shouldThrow={false} />
        </ErrorBoundary>
      </I18nextProvider>
    )
    expect(screen.getByText('safe-content')).toBeInTheDocument()
  })

  it('renders fallback when a child throws', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
          <Bomb shouldThrow={true} />
        </ErrorBoundary>
      </I18nextProvider>
    )
    expect(screen.getByText(/Une erreur est survenue/i)).toBeInTheDocument()
    expect(screen.getByText('boom-detonate')).toBeInTheDocument()
    errorSpy.mockRestore()
  })
})
