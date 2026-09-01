import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChartCardPresenter } from '../ChartCardPresenter'

describe('ChartCardPresenter', () => {
  it('renders the title and the icon', () => {
    render(
      <ChartCardPresenter titleIcon="bar_chart" title="Fréquentation par jour">
        <span data-testid="content">child</span>
      </ChartCardPresenter>
    )
    expect(screen.getByText('Fréquentation par jour')).toBeInTheDocument()
    expect(screen.getByText('bar_chart')).toBeInTheDocument()
  })

  it('renders children inside the card', () => {
    render(
      <ChartCardPresenter titleIcon="bar_chart" title="title">
        <span data-testid="content">child</span>
      </ChartCardPresenter>
    )
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })
})
