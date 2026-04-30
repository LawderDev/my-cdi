import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { JournalEntryEditDialog } from '../JournalEntryEditDialog'
import { ActivityType } from '@types'
import type { ActivityGridOption } from '@frequentation/components/ActivityGrid'

const ACTIVITIES: ActivityGridOption[] = [
  { value: ActivityType.WORK, label: 'Travail', iconName: 'edit' },
  { value: ActivityType.READING, label: 'Lecture', iconName: 'menu_book' }
]

describe('JournalEntryEditDialog', () => {
  it('forwards tile click to onActivityChange', () => {
    const onActivityChange = vi.fn()
    render(
      <I18nextProvider i18n={i18n}>
        <JournalEntryEditDialog
          open
          activity={ActivityType.WORK}
          activities={ACTIVITIES}
          onActivityChange={onActivityChange}
          onSubmit={vi.fn()}
          onClose={vi.fn()}
        />
      </I18nextProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Lecture' }))
    expect(onActivityChange).toHaveBeenCalledWith(ActivityType.READING)
  })

  it('calls onSubmit when the save button is clicked', () => {
    const onSubmit = vi.fn()
    render(
      <I18nextProvider i18n={i18n}>
        <JournalEntryEditDialog
          open
          activity={ActivityType.WORK}
          activities={ACTIVITIES}
          onActivityChange={vi.fn()}
          onSubmit={onSubmit}
          onClose={vi.fn()}
        />
      </I18nextProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
