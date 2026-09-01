import { StudentsPageLayout } from './StudentsPage.styles'
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
    <StudentsPageLayout>
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
    </StudentsPageLayout>
  )
}
