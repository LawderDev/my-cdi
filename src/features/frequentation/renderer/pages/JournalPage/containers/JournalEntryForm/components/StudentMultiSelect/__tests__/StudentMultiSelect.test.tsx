import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentMultiSelect } from '../StudentMultiSelect'

const FIRST_ID = 1
const SECOND_ID = 2

const STUDENTS = [
  { id: FIRST_ID, displayName: 'Jean Dupont', classe: '3A' },
  { id: SECOND_ID, displayName: 'Marie Martin', classe: '3B' }
]

describe('StudentMultiSelect', () => {
  it('renders the autocomplete', () => {
    render(
      <StudentMultiSelect
        students={STUDENTS}
        selectedIds={[FIRST_ID]}
        onChange={vi.fn()}
        loading={false}
      />
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})
