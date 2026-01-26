import { FC } from 'react'
import { Container, Box, Button } from '@mui/material'
import { useStudentsData } from '../hooks/useStudentsData'
import { useStudentSelection } from '../hooks/useStudentSelection'
import { useStudentSearch } from '../hooks/useStudentSearch'
import { StudentTable } from '../components/shared/StudentTable'
import { StudentsPageBatchActions } from '../components/studentsPage/StudentsPageBatchActions'
import { StudentSearchBar } from '../components/shared/StudentSearchBar'
import CSVImportButton from '../components/CSVImportButton'
import StudentEditDialog from '../components/dialogs/StudentEditDialog'
import StudentDeleteDialog from '../components/dialogs/StudentDeleteDialog'
import type { StudentViewModel } from '../types/view.models'

const StudentsPage: FC = () => {
  const studentsData = useStudentsData()
  const studentSearch = useStudentSearch({ allStudents: studentsData.students })
  const studentSelection = useStudentSelection()

  const handleStudentEdit = (student: StudentViewModel): void => {
    studentsData.openEdit(student)
  }

  const handleStudentDelete = (studentId: number): void => {
    studentsData.openDelete(studentId)
  }

  const handleSelectAll = (): void => {
    const allSelected =
      studentSelection.selectedStudents.length === studentSearch.filteredStudents.length
    studentSelection.handleSelectionChange(allSelected ? [] : studentSearch.filteredStudents)
  }

  const handleClearSelection = (): void => {
    studentSelection.clearSelection()
  }

  const handleAddStudents = async (studentsToCreate: StudentViewModel[]): Promise<void> => {
    console.log('Adding students:', studentsToCreate)
    console.log('Forcing data refresh...')
    await studentsData.fetchAll()
    console.log('Data refreshed')
  }

  const handleDeleteSelected = async (): Promise<void> => {
    const selectedIds = studentSelection.selectedStudents.map((s) => s.id)
    console.log('Deleting students:', selectedIds)
    await studentsData.fetchAll()
    studentSelection.clearSelection()
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h2>Liste des élèves</h2>
        <CSVImportButton onImported={studentsData.fetchAll} />
      </Box>

      <StudentSearchBar
        searchTerm={studentSearch.searchTerm}
        onSearch={studentSearch.handleSearch}
        onClear={studentSearch.clearSearch}
      />

      <StudentTable
        data={studentSearch.filteredStudents}
        selectedIds={studentSelection.selectedStudents.map((s) => s.id)}
        onSelectionChange={(ids: number[]) => {
          const students = ids
            .map((id) => studentSearch.filteredStudents.find((s) => s.id === id))
            .filter(Boolean) as StudentViewModel[]
          studentSelection.handleSelectionChange(students)
        }}
        onEdit={(item) => {
          if ('nom' in item) {
            // StudentViewModel
            handleStudentEdit(item)
          }
        }}
        onDelete={handleStudentDelete}
      />

      <StudentsPageBatchActions
        selectedCount={studentSelection.selectedStudents.length}
        totalCount={studentSearch.filteredStudents.length}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
        onDeleteSelected={handleDeleteSelected}
      />

      <StudentEditDialog
        open={!!studentsData.editing}
        student={studentsData.editing}
        onClose={studentsData.closeEdit}
        onSave={studentsData.handleSave}
        onUpdateStudent={studentsData.updateEditingStudent}
      />

      <StudentDeleteDialog
        open={studentsData.deleting !== null}
        onConfirm={studentsData.confirmDelete}
        onClose={studentsData.closeDelete}
      />
    </Container>
  )
}

export default StudentsPage
