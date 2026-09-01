import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityChipPresenter } from '../ActivityChipPresenter'
import { getActivityCssClass } from '@frequentation/helpers/activityFormatters'
import { ActivityType } from '@types'

describe('ActivityChipPresenter', () => {
  it('renders the activity label', () => {
    render(
      <ActivityChipPresenter cssClass={getActivityCssClass(ActivityType.WORK)} label="Travail" />
    )
    expect(screen.getByText('Travail')).toBeInTheDocument()
  })

  it('applies the activity CSS class for color tone', () => {
    const { container } = render(
      <ActivityChipPresenter cssClass={getActivityCssClass(ActivityType.WORK)} label="Travail" />
    )
    const span = container.querySelector('.act-travail')
    expect(span).not.toBeNull()
  })
})
