import { describe, it, expect } from 'vitest'
import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { StudentTablePresenter } from '../StudentTablePresenter'
import { StudentTableRowPresenter } from '../../StudentTableRowPresenter'
import type { StudentTableRowPresenterProps } from '../../StudentTableRowPresenter'
import type { StudentViewModel } from '@student/types'

const ID_FIRST = 1
const ID_SECOND = 2

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

function buildRowProps(student: StudentViewModel, selected = false): StudentTableRowPresenterProps {
  return {
    student,
    initials: 'JD',
    selected,
    onCheckboxChange: () => {},
    onCheckboxClick: () => {},
    onEditClick: () => {},
    onDeleteClick: () => {}
  }
}

function buildHeaderNodes(): ReactNode[] {
  return [
    <th key="checkbox" />,
    <th key="nom">Nom</th>,
    <th key="prenom">Prénom</th>,
    <th key="classe">Classe</th>,
    <th key="ine">INE</th>,
    <th key="visits">Visites</th>,
    <th key="actions">Actions</th>
  ]
}

describe('StudentTablePresenter', () => {
  it('renders student row nodes', () => {
    render(
      <StudentTablePresenter
        headerNodes={buildHeaderNodes()}
        rowNodes={STUDENTS.map((student) => (
          <StudentTableRowPresenter key={student.id} {...buildRowProps(student)} />
        ))}
        countLabel="2 élèves"
      />
    )

    expect(screen.getByText('Dupont')).toBeInTheDocument()
    expect(screen.getByText('Jean')).toBeInTheDocument()
    expect(screen.getByText('3ème A')).toBeInTheDocument()
    expect(screen.getByText('2 élèves')).toBeInTheDocument()
  })

  it('renders the header nodes it receives', () => {
    render(
      <StudentTablePresenter headerNodes={buildHeaderNodes()} rowNodes={[]} countLabel="0 élève" />
    )

    expect(screen.getByText('Nom')).toBeInTheDocument()
    expect(screen.getByText('Prénom')).toBeInTheDocument()
    expect(screen.getByText('Classe')).toBeInTheDocument()
    expect(screen.getByText('INE')).toBeInTheDocument()
  })
})
