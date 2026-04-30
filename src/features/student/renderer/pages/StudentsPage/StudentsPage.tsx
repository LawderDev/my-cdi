import { Container } from '@mui/material'
import { useStudentsPage } from './hooks/useStudentsPage'
import { StudentsPageHeader } from './components/StudentsPageHeader'
import { StudentList } from './containers/StudentList'
import { StudentForm } from './containers/StudentForm'

const CONTAINER_TOP_MARGIN = 3

export function StudentsPage() {
  const {
    title,
    isAddDialogOpen,
    openAddDialog,
    closeAddDialog,
    editingStudent,
    setEditingStudent,
    closeEditDialog,
    openCsvImport
  } = useStudentsPage()

  return (
    <Container sx={{ mt: CONTAINER_TOP_MARGIN }}>
      <StudentsPageHeader title={title} />

      <StudentList
        onEditStudent={setEditingStudent}
        onAddStudent={openAddDialog}
        onImportCsv={openCsvImport}
      />

      <StudentForm mode="create" student={null} open={isAddDialogOpen} onClose={closeAddDialog} />

      <StudentForm
        mode="edit"
        student={editingStudent}
        open={editingStudent !== null}
        onClose={closeEditDialog}
      />
    </Container>
  )
}
