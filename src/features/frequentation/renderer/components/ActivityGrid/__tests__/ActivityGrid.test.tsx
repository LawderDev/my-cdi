import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityGrid } from '../ActivityGrid'
import { buildActivityTiles } from '../helpers/buildActivityTiles'
import { ActivityType } from '@types'
import type { ActivityGridOption } from '../types/ActivityGridProps'

const OPTIONS: ActivityGridOption[] = [
  { value: ActivityType.COMPUTER, label: 'Ordinateur', iconName: 'computer' },
  { value: ActivityType.WORK, label: 'Travail', iconName: 'edit' },
  { value: ActivityType.READING, label: 'Lecture', iconName: 'menu_book' }
]

describe('ActivityGrid', () => {
  it('renders one tile per option', () => {
    const tiles = buildActivityTiles(OPTIONS, ActivityType.COMPUTER, vi.fn())
    render(<ActivityGrid tiles={tiles} />)
    expect(screen.getByRole('button', { name: 'Ordinateur' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Travail' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Lecture' })).toBeInTheDocument()
  })

  it('marks the active tile with data-selected="true"', () => {
    const tiles = buildActivityTiles(OPTIONS, ActivityType.WORK, vi.fn())
    render(<ActivityGrid tiles={tiles} />)
    expect(screen.getByRole('button', { name: 'Travail' })).toHaveAttribute('data-selected', 'true')
    expect(screen.getByRole('button', { name: 'Ordinateur' })).toHaveAttribute(
      'data-selected',
      'false'
    )
  })

  it('calls onChange with the clicked tile value', () => {
    const onChange = vi.fn()
    const tiles = buildActivityTiles(OPTIONS, ActivityType.COMPUTER, onChange)
    render(<ActivityGrid tiles={tiles} />)
    fireEvent.click(screen.getByRole('button', { name: 'Lecture' }))
    expect(onChange).toHaveBeenCalledWith(ActivityType.READING)
  })
})
