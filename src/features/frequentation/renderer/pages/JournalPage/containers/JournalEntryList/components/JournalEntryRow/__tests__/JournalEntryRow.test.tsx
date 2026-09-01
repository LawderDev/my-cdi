import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { JournalEntryRow } from '../JournalEntryRow'
import { ActivityType } from '@types'
import type { JournalEntryViewModel } from '@frequentation/types'

const ENTRY_ID = 42
const STUDENT_ID = 7

const entry: JournalEntryViewModel = {
  id: ENTRY_ID,
  startsAt: '2026-04-01T09:00:00.000',
  activity: ActivityType.WORK,
  student: {
    id: STUDENT_ID,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: 'INE-1',
    displayName: 'Jean Dupont'
  },
  activityLabel: 'Travail',
  activityColor: '#1976d2'
}

function renderRow(props: Partial<Parameters<typeof JournalEntryRow>[0]> = {}) {
  return render(
    <I18nextProvider i18n={i18n}>
      <JournalEntryRow
        entry={entry}
        selected={false}
        onRowClick={vi.fn()}
        onEditClick={vi.fn()}
        onDeleteClick={vi.fn()}
        {...props}
      />
    </I18nextProvider>
  )
}

function findRow(): Element {
  const row = document.querySelector('[role="row"]')
  if (!row) {
    throw new Error('Row not found')
  }
  return row
}

describe('JournalEntryRow', () => {
  it('renders student name, class, time, and activity label', () => {
    renderRow()
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByText('3ème A')).toBeInTheDocument()
    expect(screen.getByText('Travail')).toBeInTheDocument()
    expect(screen.getByText('09:00')).toBeInTheDocument()
  })

  it('clicking the row triggers onRowClick', () => {
    const onRowClick = vi.fn()
    renderRow({ onRowClick })
    fireEvent.click(findRow())
    expect(onRowClick).toHaveBeenCalledTimes(1)
  })

  it('clicking the delete IconButton triggers onDeleteClick', () => {
    const onDeleteClick = vi.fn()
    renderRow({ onDeleteClick })
    fireEvent.click(screen.getByRole('button', { name: /supprimer/i }))
    expect(onDeleteClick).toHaveBeenCalledTimes(1)
  })

  it('clicking the edit IconButton triggers onEditClick', () => {
    const onEditClick = vi.fn()
    renderRow({ onEditClick })
    fireEvent.click(screen.getByRole('button', { name: /modifier/i }))
    expect(onEditClick).toHaveBeenCalledTimes(1)
  })
})
