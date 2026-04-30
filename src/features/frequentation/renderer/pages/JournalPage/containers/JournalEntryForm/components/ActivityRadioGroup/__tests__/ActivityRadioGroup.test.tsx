import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityRadioGroup } from '../ActivityRadioGroup'
import { ActivityType } from '@types'
import type { ActivityGridOption } from '@frequentation/components/ActivityGrid'

const ACTIVITIES: ActivityGridOption[] = [
  { value: ActivityType.WORK, label: 'Travail', iconName: 'edit' },
  { value: ActivityType.READING, label: 'Lecture', iconName: 'menu_book' }
]

describe('ActivityRadioGroup', () => {
  it('renders one tile per activity', () => {
    render(
      <ActivityRadioGroup activities={ACTIVITIES} value={ActivityType.WORK} onChange={vi.fn()} />
    )
    expect(screen.getByRole('button', { name: 'Travail' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Lecture' })).toBeInTheDocument()
  })

  it('forwards onChange', () => {
    const onChange = vi.fn()
    render(
      <ActivityRadioGroup activities={ACTIVITIES} value={ActivityType.WORK} onChange={onChange} />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Lecture' }))
    expect(onChange).toHaveBeenCalledWith(ActivityType.READING)
  })
})
