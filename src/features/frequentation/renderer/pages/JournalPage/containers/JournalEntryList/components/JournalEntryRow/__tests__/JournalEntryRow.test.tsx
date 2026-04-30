import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Table, TableBody } from '@mui/material'
import { JournalEntryRow } from '../JournalEntryRow'
import { ActivityType } from '@types'
import type { JournalEntryViewModel } from '@frequentation/types'

const ENTRY_ID = 42
const STUDENT_ID = 7

const entry: JournalEntryViewModel = {
  id: ENTRY_ID,
  startsAt: '2026-04-01T09:00:00.000Z',
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
    <Table>
      <TableBody>
        <JournalEntryRow
          entry={entry}
          selected={false}
          onToggleSelection={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          {...props}
        />
      </TableBody>
    </Table>
  )
}

describe('JournalEntryRow', () => {
  it('renders student name and activity label', () => {
    renderRow()
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByText('Travail')).toBeInTheDocument()
  })

  it('forwards selection toggle', () => {
    const onToggleSelection = vi.fn()
    renderRow({ onToggleSelection })
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onToggleSelection).toHaveBeenCalledWith(ENTRY_ID)
  })
})
