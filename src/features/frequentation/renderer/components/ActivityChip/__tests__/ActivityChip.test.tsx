import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityChip } from '../ActivityChip'
import { ActivityType } from '@types'

describe('ActivityChip', () => {
  it('renders the activity label', () => {
    render(<ActivityChip activity={ActivityType.WORK} label="Travail" color="#1976d2" />)
    expect(screen.getByText('Travail')).toBeInTheDocument()
  })
})
