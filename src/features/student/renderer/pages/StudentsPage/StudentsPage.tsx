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
    <div className="flex flex-col gap-5">
      <StudentList onEditStudent={setEditingStudent} onAddStudent={openAddDialog} />

      <StudentForm mode="create" student={null} open={isAddDialogOpen} onClose={closeAddDialog} />

      <StudentForm
        mode="edit"
        student={editingStudent}
        open={editingStudent !== null}
        onClose={closeEditDialog}
      />
    </div>
  )
}
