import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StudentAvatarPresenter } from '../StudentAvatarPresenter'
import { buildStudentInitials } from '@student/helpers/studentFormatters'

const STUDENT_ID = 1

describe('StudentAvatarPresenter', () => {
  it('renders the given initials', () => {
    render(<StudentAvatarPresenter id={STUDENT_ID} initials="JD" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders uppercase initials built by buildStudentInitials', () => {
    render(<StudentAvatarPresenter id={STUDENT_ID} initials={buildStudentInitials('A', 'B')} />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })
})
