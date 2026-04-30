import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ActivityRadioGroup } from '../ActivityRadioGroup'
import { ActivityType } from '@types'

const ACTIVITIES = [
  { value: ActivityType.WORK, label: 'Travail' },
  { value: ActivityType.READING, label: 'Lecture' }
]

describe('ActivityRadioGroup', () => {
  it('renders one radio per activity', () => {
    render(
      <ActivityRadioGroup activities={ACTIVITIES} value={ActivityType.WORK} onChange={vi.fn()} />
    )
    expect(screen.getByLabelText('Travail')).toBeInTheDocument()
    expect(screen.getByLabelText('Lecture')).toBeInTheDocument()
  })

  it('forwards onChange', () => {
    const onChange = vi.fn()
    render(
      <ActivityRadioGroup activities={ACTIVITIES} value={ActivityType.WORK} onChange={onChange} />
    )
    fireEvent.click(screen.getByLabelText('Lecture'))
    expect(onChange).toHaveBeenCalledWith(ActivityType.READING)
  })
})
