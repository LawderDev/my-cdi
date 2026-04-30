import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { StatisticsPagePlaceholder } from '../StatisticsPagePlaceholder'

function renderWithProviders() {
  return render(
    <I18nextProvider i18n={i18n}>
      <StatisticsPagePlaceholder />
    </I18nextProvider>
  )
}

describe('StatisticsPagePlaceholder', () => {
  it('renders the statistics title', () => {
    renderWithProviders()
    expect(screen.getByRole('heading', { name: /Statistiques/i })).toBeInTheDocument()
  })

  it('renders the coming soon message', () => {
    renderWithProviders()
    expect(screen.getByText(/en cours de développement/i)).toBeInTheDocument()
  })

  it('renders the description', () => {
    renderWithProviders()
    expect(screen.getByText(/seront bientôt disponibles/i)).toBeInTheDocument()
  })
})
