import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@ui/theme'
import type { ReactNode } from 'react'
import { StudentAvatarPresenter } from '../StudentAvatarPresenter'
import { buildStudentInitials } from '@student/helpers/studentFormatters'

const STUDENT_ID = 1

function withTheme(ui: ReactNode) {
  return <ThemeProvider theme={theme}>{ui}</ThemeProvider>
}

describe('StudentAvatarPresenter', () => {
  it('renders the given initials', () => {
    render(withTheme(<StudentAvatarPresenter id={STUDENT_ID} initials="JD" />))
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders uppercase initials built by buildStudentInitials', () => {
    render(
      withTheme(
        <StudentAvatarPresenter id={STUDENT_ID} initials={buildStudentInitials('A', 'B')} />
      )
    )
    expect(screen.getByText('AB')).toBeInTheDocument()
  })
})
