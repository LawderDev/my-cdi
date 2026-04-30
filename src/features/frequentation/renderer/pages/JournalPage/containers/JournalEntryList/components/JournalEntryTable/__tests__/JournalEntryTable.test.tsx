import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JournalEntryTable } from '../JournalEntryTable'
import { ActivityType } from '@types'
import '@shared/i18n/config'

const ENTRIES = [
  {
    id: 1,
    startsAt: '2026-04-01T09:00:00.000Z',
    activity: ActivityType.WORK,
    student: { id: 1, nom: 'A', prenom: 'B', classe: '3A', ine: 'I', displayName: 'B A' },
    activityLabel: 'Travail',
    activityColor: '#000'
  }
]

describe('JournalEntryTable', () => {
  it('renders one row per entry', () => {
    render(
      <JournalEntryTable
        entries={ENTRIES}
        selectedIds={[]}
        onToggleSelection={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    )
    expect(screen.getByText('B A')).toBeInTheDocument()
  })

  it('renders an empty-state message when there are no entries', () => {
    render(
      <JournalEntryTable
        entries={[]}
        selectedIds={[]}
        onToggleSelection={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    )
    expect(screen.getByText(/aucune/i)).toBeInTheDocument()
  })
})
