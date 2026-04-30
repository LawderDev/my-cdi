import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityChip } from '../ActivityChip'
import { ActivityType } from '@types'

describe('ActivityChip', () => {
  it('renders the activity label', () => {
    render(<ActivityChip activity={ActivityType.WORK} label="Travail" />)
    expect(screen.getByText('Travail')).toBeInTheDocument()
  })

  it('applies the activity CSS class for color tone', () => {
    const { container } = render(<ActivityChip activity={ActivityType.WORK} label="Travail" />)
    const span = container.querySelector('.act-travail')
    expect(span).not.toBeNull()
  })
})
