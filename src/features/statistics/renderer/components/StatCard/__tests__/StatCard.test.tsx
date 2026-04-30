import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from '../StatCard'

describe('StatCard', () => {
  it('renders the label and value', () => {
    render(
      <StatCard
        iconName="people"
        iconBgClass="bg-accent-bg"
        iconColorClass="text-accent"
        label="Visites totales"
        value="1,247"
      />
    )
    expect(screen.getByText('Visites totales')).toBeInTheDocument()
    expect(screen.getByText('1,247')).toBeInTheDocument()
  })

  it('renders the delta with success style when sign is up', () => {
    render(
      <StatCard
        iconName="people"
        iconBgClass="bg-accent-bg"
        iconColorClass="text-accent"
        label="Visites totales"
        value="1,247"
        delta={{ sign: 'up', text: '↑ 12%' }}
      />
    )
    const deltaNode = screen.getByText('↑ 12%')
    expect(deltaNode.className).toContain('text-success')
  })

  it('renders the delta with danger style when sign is down', () => {
    render(
      <StatCard
        iconName="nights_stay"
        iconBgClass="bg-accent-bg"
        iconColorClass="text-accent"
        label="Taux après-midi"
        value="43%"
        delta={{ sign: 'down', text: '↓ 4 points' }}
      />
    )
    const deltaNode = screen.getByText('↓ 4 points')
    expect(deltaNode.className).toContain('text-danger')
  })

  it('omits the delta block when delta is not provided', () => {
    const { container } = render(
      <StatCard
        iconName="people"
        iconBgClass="bg-accent-bg"
        iconColorClass="text-accent"
        label="Visites"
        value="1"
      />
    )
    expect(container.querySelectorAll('.text-success').length).toBe(0)
    expect(container.querySelectorAll('.text-danger').length).toBe(0)
  })
})
