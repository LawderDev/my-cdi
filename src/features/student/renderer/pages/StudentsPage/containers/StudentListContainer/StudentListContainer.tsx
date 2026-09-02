import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader } from '@ui/components/Loader'
import { Toast } from '@ui/components/Toast'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { useToast } from '@ui/hooks/useToast'
import { useStudentListData } from './hooks/useStudentListData'
import { useStudentSelection } from './hooks/useStudentSelection'
import { useDeleteStudent } from '@student/api/useStudentMutations'
import { buildStudentInitials } from '@student/helpers/studentFormatters'
import { StudentTablePresenter } from './presenters/StudentTablePresenter'
import { StudentTableRowPresenter } from './presenters/StudentTableRowPresenter'
import { buildNextSortConfig } from './helpers/buildNextSortConfig'
import { StudentListToolbarPresenter } from './presenters/StudentListToolbarPresenter'
import { StudentBatchActionsContainer } from './containers/StudentBatchActionsContainer'
import {
  CHECKBOX_CELL_STYLE,
  ACTIONS_CELL_STYLE,
  SortIcon,
  StudentListLayout
} from './StudentListContainer.styles'
import type { StudentListContainerProps } from './types/StudentListContainerProps'
import type { StudentSortField, StudentViewModel } from '@student/types'

const SORTABLE_FIELDS: readonly StudentSortField[] = ['nom', 'prenom', 'classe', 'ine']

export function StudentListContainer({ onEditStudent, onAddStudent }: StudentListContainerProps) {
  const { t: tCommon } = useTranslation('common')
  const { t: tStudent } = useTranslation('student')
  const { filteredStudents, searchTerm, setSearchTerm, sortConfig, setSortConfig, isLoading } =
    useStudentListData()

  const { selectedIds, selectedCount, toggle, selectAll, clearSelection } = useStudentSelection()
  const { toast, show, dismiss } = useToast()
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const { mutate: deleteStudent } = useDeleteStudent({
    onSuccess: () => {
      show(tStudent('deleteSuccess'))
    }
  })

  function handleSelectAll() {
    selectAll(filteredStudents.map((student) => student.id))
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function handleDeleteClick(id: number) {
    setPendingDeleteId(id)
  }

  function handleConfirmDelete() {
    if (pendingDeleteId !== null) {
      deleteStudent({ id: pendingDeleteId })
      setPendingDeleteId(null)
    }
  }

  function closeConfirmDelete() {
    setPendingDeleteId(null)
  }

  function buildRowNodes(students: StudentViewModel[]): ReactNode[] {
    return students.map((student) => (
      <StudentTableRowPresenter
        key={student.id}
        student={student}
        initials={buildStudentInitials(student.prenom, student.nom)}
        selected={selectedIds.includes(student.id)}
        onCheckboxChange={() => {
          toggle(student.id)
        }}
        onCheckboxClick={(event) => {
          event.stopPropagation()
        }}
        onEditClick={(event) => {
          event.stopPropagation()
          onEditStudent(student)
        }}
        onDeleteClick={(event) => {
          event.stopPropagation()
          handleDeleteClick(student.id)
        }}
      />
    ))
  }

  function buildHeaderNodes(): ReactNode[] {
    const sortNodes: ReactNode[] = SORTABLE_FIELDS.map((field) => (
      <th
        key={field}
        onClick={() => {
          setSortConfig(buildNextSortConfig(sortConfig, field))
        }}
      >
        {tStudent(`fields.${field}`)}
        <SortIcon name="unfold_more" />
      </th>
    ))
    return [
      <th key="checkbox" style={CHECKBOX_CELL_STYLE} />,
      ...sortNodes,
      <th key="visits">
        {tStudent('fields.visits')}
        <SortIcon name="unfold_more" />
      </th>,
      <th key="actions" style={ACTIONS_CELL_STYLE}>
        {tStudent('fields.actions')}
      </th>
    ]
  }

  if (isLoading) {
    return <Loader message={tCommon('app.loading')} />
  }

  return (
    <StudentListLayout>
      <StudentListToolbarPresenter
        searchTerm={searchTerm}
        totalCount={filteredStudents.length}
        onSearchChange={handleSearchChange}
        onAddStudent={onAddStudent}
      />

      <StudentBatchActionsContainer
        selectedIds={selectedIds}
        selectedCount={selectedCount}
        totalCount={filteredStudents.length}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
        onAfterDelete={clearSelection}
      />

      <StudentTablePresenter
        headerNodes={buildHeaderNodes()}
        rowNodes={buildRowNodes(filteredStudents)}
        countLabel={tStudent('count', { count: filteredStudents.length })}
      />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title={tCommon('app.confirmDelete')}
        message={tStudent('row.confirmDelete')}
        destructive
        onConfirm={handleConfirmDelete}
        onClose={closeConfirmDelete}
      />
      <Toast toast={toast} onClose={dismiss} />
    </StudentListLayout>
  )
}
