import { Container, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useStudentsPage } from './hooks/useStudentsPage'
import { StudentList } from './containers/StudentList'
import { StudentForm } from './containers/StudentForm'

const CONTAINER_TOP_MARGIN = 3
const HEADER_BOTTOM_MARGIN = 2

export function StudentsPage() {
  const { t } = useTranslation('student')
  const {
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
      <Box sx={{ mb: HEADER_BOTTOM_MARGIN }}>
        <Typography variant="h4">{t('title')}</Typography>
      </Box>

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
