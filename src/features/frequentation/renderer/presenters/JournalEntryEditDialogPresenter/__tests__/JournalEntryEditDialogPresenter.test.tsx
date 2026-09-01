import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { JournalEntryEditDialogPresenter } from '../JournalEntryEditDialogPresenter'
import { buildActivityTiles } from '@frequentation/presenters/ActivityGridPresenter/helpers/buildActivityTiles'
import { buildActivityTileNodes } from '@frequentation/presenters/ActivityGridPresenter/helpers/buildActivityTileNodes'
import { ActivityType } from '@types'
import type { ActivityGridOption } from '@frequentation/presenters/ActivityGridPresenter'

const ACTIVITIES: ActivityGridOption[] = [
  { value: ActivityType.WORK, label: 'Travail', iconName: 'edit' },
  { value: ActivityType.READING, label: 'Lecture', iconName: 'menu_book' }
]

describe('JournalEntryEditDialogPresenter', () => {
  it('forwards tile click to onActivityChange', () => {
    const onActivityChange = vi.fn()
    const tiles = buildActivityTiles(ACTIVITIES, ActivityType.WORK, onActivityChange)
    render(
      <I18nextProvider i18n={i18n}>
        <JournalEntryEditDialogPresenter
          open
          tileNodes={buildActivityTileNodes(tiles)}
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
    const tiles = buildActivityTiles(ACTIVITIES, ActivityType.WORK, vi.fn())
    render(
      <I18nextProvider i18n={i18n}>
        <JournalEntryEditDialogPresenter
          open
          tileNodes={buildActivityTileNodes(tiles)}
          onSubmit={onSubmit}
          onClose={vi.fn()}
        />
      </I18nextProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: /enregistrer/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
