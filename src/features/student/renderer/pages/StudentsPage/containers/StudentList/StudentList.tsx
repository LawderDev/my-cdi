import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useStudentListData } from './hooks/useStudentListData'
import { useStudentSelection } from './hooks/useStudentSelection'
import { useDeleteStudent } from '@student/api/useStudentMutations'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { StudentTable } from './components/StudentTable'
import type { StudentSortHeader } from './components/StudentTable'
import { buildNextSortConfig } from './components/StudentTable/helpers/buildNextSortConfig'
import { StudentListToolbar } from './components/StudentListToolbar'
import { StudentBatchActions } from './containers/StudentBatchActions'
import type { StudentTableRowProps } from './components/StudentTableRow'
import type { StudentListProps } from './types/StudentListProps'
import type { StudentSortField, StudentViewModel } from '@student/types'

const FEEDBACK_AUTO_HIDE_MS = 4000

const SORTABLE_FIELDS: readonly StudentSortField[] = ['nom', 'prenom', 'classe', 'ine']

export function StudentList({ onEditStudent, onAddStudent }: StudentListProps) {
  const { t: tCommon } = useTranslation('common')
  const { t: tStudent } = useTranslation('student')
  const { filteredStudents, searchTerm, setSearchTerm, sortConfig, setSortConfig, isLoading } =
    useStudentListData()

  const { selectedIds, selectedCount, toggle, selectAll, clearSelection } = useStudentSelection()
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const { mutate: deleteStudent } = useDeleteStudent({
    onSuccess: () => {
      setDeleteSuccess(true)
    }
  })

  function handleSelectAll() {
    selectAll(filteredStudents.map((student) => student.id))
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function buildRowProps(student: StudentViewModel): StudentTableRowProps {
    return {
      student,
      selected: selectedIds.includes(student.id),
      onCheckboxChange: () => {
        toggle(student.id)
      },
      onCheckboxClick: (event) => {
        event.stopPropagation()
      },
      onEditClick: (event) => {
        event.stopPropagation()
        onEditStudent(student)
      },
      onDeleteClick: (event) => {
        event.stopPropagation()
        handleDeleteClick(student.id)
      }
    }
  }

  function buildSortHeaders(): StudentSortHeader[] {
    return SORTABLE_FIELDS.map((field) => ({
      field,
      onClick: () => {
        setSortConfig(buildNextSortConfig(sortConfig, field))
      }
    }))
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

  function dismissDeleteSuccess() {
    setDeleteSuccess(false)
  }

  if (isLoading) {
    return <Box>{tCommon('app.loading')}</Box>
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <StudentListToolbar
        searchTerm={searchTerm}
        totalCount={filteredStudents.length}
        onSearchChange={handleSearchChange}
        onAddStudent={onAddStudent}
      />

      <StudentBatchActions
        selectedIds={selectedIds}
        selectedCount={selectedCount}
        totalCount={filteredStudents.length}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
        onAfterDelete={clearSelection}
      />

      <StudentTable rows={filteredStudents.map(buildRowProps)} sortHeaders={buildSortHeaders()} />

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title={tCommon('app.confirmDelete')}
        message={tStudent('row.confirmDelete')}
        destructive
        onConfirm={handleConfirmDelete}
        onClose={closeConfirmDelete}
      />
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={FEEDBACK_AUTO_HIDE_MS}
        onClose={dismissDeleteSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={dismissDeleteSuccess} variant="filled">
          {tStudent('deleteSuccess')}
        </Alert>
      </Snackbar>
    </Box>
  )
}
