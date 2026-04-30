import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChartCard } from '../ChartCard'

describe('ChartCard', () => {
  it('renders the title and the icon', () => {
    render(
      <ChartCard titleIcon="bar_chart" title="Fréquentation par jour">
        <span data-testid="content">child</span>
      </ChartCard>
    )
    expect(screen.getByText('Fréquentation par jour')).toBeInTheDocument()
    expect(screen.getByText('bar_chart')).toBeInTheDocument()
  })

  it('renders children inside the card', () => {
    render(
      <ChartCard titleIcon="bar_chart" title="title">
        <span data-testid="content">child</span>
      </ChartCard>
    )
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })
})
