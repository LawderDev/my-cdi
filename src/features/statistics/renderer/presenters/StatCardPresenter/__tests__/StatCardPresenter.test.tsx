import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCardPresenter } from '../StatCardPresenter'

describe('StatCardPresenter', () => {
  it('renders the label and value', () => {
    render(
      <StatCardPresenter
        iconName="people"
        iconBg="var(--accent-bg)"
        iconColor="var(--accent)"
        label="Visites totales"
        value="1,247"
      />
    )
    expect(screen.getByText('Visites totales')).toBeInTheDocument()
    expect(screen.getByText('1,247')).toBeInTheDocument()
  })

  it('renders the delta with up sign when sign is up', () => {
    render(
      <StatCardPresenter
        iconName="people"
        iconBg="var(--accent-bg)"
        iconColor="var(--accent)"
        label="Visites totales"
        value="1,247"
        delta={{ sign: 'up', text: '↑ 12%' }}
      />
    )
    const deltaNode = screen.getByText('↑ 12%')
    expect(deltaNode.getAttribute('data-sign')).toBe('up')
  })

  it('renders the delta with down sign when sign is down', () => {
    render(
      <StatCardPresenter
        iconName="nights_stay"
        iconBg="var(--accent-bg)"
        iconColor="var(--accent)"
        label="Taux après-midi"
        value="43%"
        delta={{ sign: 'down', text: '↓ 4 points' }}
      />
    )
    const deltaNode = screen.getByText('↓ 4 points')
    expect(deltaNode.getAttribute('data-sign')).toBe('down')
  })

  it('omits the delta block when delta is not provided', () => {
    const { container } = render(
      <StatCardPresenter
        iconName="people"
        iconBg="var(--accent-bg)"
        iconColor="var(--accent)"
        label="Visites"
        value="1"
      />
    )
    expect(container.querySelectorAll('[data-sign]').length).toBe(0)
  })
})
