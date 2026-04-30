import Box from '@mui/material/Box'
import { useStudentsPage } from './hooks/useStudentsPage'
import { StudentList } from './containers/StudentList'
import { StudentForm } from './containers/StudentForm'

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
      <StudentList onEditStudent={setEditingStudent} onAddStudent={openAddDialog} />

      <StudentForm mode="create" student={null} open={isAddDialogOpen} onClose={closeAddDialog} />

      <StudentForm
        mode="edit"
        student={editingStudent}
        open={editingStudent !== null}
        onClose={closeEditDialog}
      />
    </Box>
  )
}
