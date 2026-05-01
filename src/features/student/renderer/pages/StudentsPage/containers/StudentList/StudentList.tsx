import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useStudentListData } from './hooks/useStudentListData'
import { useStudentSelection } from './hooks/useStudentSelection'
import { useDeleteStudent } from '@student/api/useStudentMutations'
import { ConfirmDialog } from '@ui/components/ConfirmDialog'
import { StudentTable } from './components/StudentTable'
import { StudentListToolbar } from './components/StudentListToolbar'
import { StudentBatchActions } from './containers/StudentBatchActions'
import type { StudentListProps } from './types/StudentListProps'

const FEEDBACK_AUTO_HIDE_MS = 4000

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
        onSearchChange={setSearchTerm}
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

      <StudentTable
        students={filteredStudents}
        selectedIds={selectedIds}
        onToggleSelection={toggle}
        onEdit={onEditStudent}
        onDelete={handleDeleteClick}
        sortConfig={sortConfig}
        onSort={setSortConfig}
      />

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
