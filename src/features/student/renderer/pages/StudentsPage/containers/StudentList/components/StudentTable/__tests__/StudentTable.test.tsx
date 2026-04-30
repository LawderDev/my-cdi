import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { StudentTable } from '../StudentTable'
import type { StudentViewModel } from '@student/types'

const ID_FIRST = 1
const ID_SECOND = 2
const SELECTED_ROW_CHECKBOX_INDEX = 0

const STUDENTS: StudentViewModel[] = [
  {
    id: ID_FIRST,
    nom: 'Dupont',
    prenom: 'Jean',
    classe: '3ème A',
    ine: '111A',
    fullName: 'Jean Dupont',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    displayName: 'Jean Dupont',
    classLabel: '3ème A'
  },
  {
    id: ID_SECOND,
    nom: 'Martin',
    prenom: 'Marie',
    classe: '3ème B',
    ine: '222B',
    fullName: 'Marie Martin',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    displayName: 'Marie Martin',
    classLabel: '3ème B'
  }
]

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

describe('StudentTable', () => {
  it('renders student rows', () => {
    renderWithI18n(
      <StudentTable
        students={STUDENTS}
        selectedIds={[]}
        onToggleSelection={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={{ field: 'nom', direction: 'asc' }}
        onSort={vi.fn()}
      />
    )

    expect(screen.getByText('Dupont')).toBeInTheDocument()
    expect(screen.getByText('Jean')).toBeInTheDocument()
    expect(screen.getByText('Martin')).toBeInTheDocument()
    expect(screen.getByText('3ème A')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    renderWithI18n(
      <StudentTable
        students={[]}
        selectedIds={[]}
        onToggleSelection={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={{ field: 'nom', direction: 'asc' }}
        onSort={vi.fn()}
      />
    )

    expect(screen.getByText('Nom')).toBeInTheDocument()
    expect(screen.getByText('Prénom')).toBeInTheDocument()
    expect(screen.getByText('Classe')).toBeInTheDocument()
    expect(screen.getByText('INE')).toBeInTheDocument()
  })

  it('shows checkboxes for selected rows', () => {
    renderWithI18n(
      <StudentTable
        students={STUDENTS}
        selectedIds={[ID_FIRST]}
        onToggleSelection={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        sortConfig={{ field: 'nom', direction: 'asc' }}
        onSort={vi.fn()}
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[SELECTED_ROW_CHECKBOX_INDEX]).toBeChecked()
  })
})
