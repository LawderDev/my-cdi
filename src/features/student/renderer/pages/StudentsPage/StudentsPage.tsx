import Box from '@mui/material/Box'
import { useStudentsPage } from './hooks/useStudentsPage'
import { StudentListContainer } from './containers/StudentListContainer'
import { StudentFormContainer } from './containers/StudentFormContainer'

export function StudentsPage() {
  const {
    isAddDialogOpen,
    openAddDialog,
    closeAddDialog,
    editingStudent,
    setEditingStudent,
    closeEditDialog
  } = useStudentsPage()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <StudentListContainer onEditStudent={setEditingStudent} onAddStudent={openAddDialog} />

      <StudentFormContainer
        mode="create"
        student={null}
        open={isAddDialogOpen}
        onClose={closeAddDialog}
      />

      <StudentFormContainer
        mode="edit"
        student={editingStudent}
        open={editingStudent !== null}
        onClose={closeEditDialog}
      />
    </Box>
  )
}
