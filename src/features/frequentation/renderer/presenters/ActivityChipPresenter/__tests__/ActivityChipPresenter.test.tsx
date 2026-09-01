import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@ui/theme'
import { ActivityChipPresenter } from '../ActivityChipPresenter'
import { getActivityTone } from '@frequentation/helpers/activityFormatters'
import { ActivityType } from '@types'

describe('ActivityChipPresenter', () => {
  it('renders the activity label', () => {
    render(
      <ThemeProvider theme={theme}>
        <ActivityChipPresenter tone={getActivityTone(ActivityType.WORK)} label="Travail" />
      </ThemeProvider>
    )
    expect(screen.getByText('Travail')).toBeInTheDocument()
  })

  it('exposes the activity tone through the data-tone attribute', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ActivityChipPresenter tone={getActivityTone(ActivityType.WORK)} label="Travail" />
      </ThemeProvider>
    )
    const span = container.querySelector('[data-tone="work"]')
    expect(span).not.toBeNull()
  })
})
