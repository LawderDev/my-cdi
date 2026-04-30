import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChartLegend } from '../ChartLegend'

const ITEM_VALUE = 38

describe('ChartLegend', () => {
  it('renders one row per item with label and value', () => {
    render(
      <ChartLegend
        items={[
          { color: '#60a5fa', label: 'Ordinateur', value: ITEM_VALUE },
          { color: '#4ade80', label: 'Travail', value: 1 }
        ]}
      />
    )
    expect(screen.getByText('Ordinateur')).toBeInTheDocument()
    expect(screen.getByText('Travail')).toBeInTheDocument()
    expect(screen.getByText(String(ITEM_VALUE))).toBeInTheDocument()
  })

  it('renders no rows when items is empty', () => {
    const { container } = render(<ChartLegend items={[]} />)
    expect(container.querySelectorAll('.flex.items-center.gap-2').length).toBe(0)
  })
})
