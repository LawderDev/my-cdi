import { FC, useState } from 'react'
import { Container, Box, Button } from '@mui/material'
import { useStudentsData } from '../../features/students/hooks/useStudentsData'
import { useStudentSelection } from '../../features/students/hooks/useStudentSelection'
import { useStudentSearch } from '../../features/students/hooks/useStudentSearch'
import { StudentTable } from '../../components/shared/StudentTable'
import { StudentsPageBatchActions } from '../../features/students/components/StudentsPageBatchActions'
import { StudentSearchBar } from '../../components/shared/StudentSearchBar'
import CSVImportButton from '../../components/CSVImportButton'
import StudentEditDialog from '../../components/dialogs/StudentEditDialog'
import StudentDeleteDialog from '../../components/dialogs/StudentDeleteDialog'
import StudentAddDialog from '../../components/dialogs/StudentAddDialog'
import type { StudentViewModel } from '../../types/view.models'
import { rootContainerStyles } from '../../lib/styles/StudentsTable.styles'
import type { CreateStudentDto } from '@shared/types'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const StudentsPage: FC = () => {
  const { t } = useTranslation()
  const studentsData = useStudentsData()
  const studentSearch = useStudentSearch({ allStudents: studentsData.students })
  const studentSelection = useStudentSelection()
  const queryClient = useQueryClient()

  const [adding, setAdding] = useState(false)

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

  const handleCreateStudent = async (studentData: CreateStudentDto): Promise<boolean> => {
    return await studentsData.createStudent(studentData)
  }

  const handleDeleteSelected = async (): Promise<void> => {
    studentSelection.clearSelection()
  }

  return (
    <Container sx={rootContainerStyles}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h2>{t('studentPage.title')}</h2>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => setAdding(true)}>
            {t('studentPage.addStudentButton.label')}
          </Button>
          <CSVImportButton
            onImported={() => {
              queryClient.invalidateQueries({ queryKey: ['students'] })
              queryClient.invalidateQueries({ queryKey: ['journal'] })
            }}
          />
        </Box>
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

      <StudentAddDialog
        open={adding}
        onClose={() => setAdding(false)}
        onCreate={handleCreateStudent}
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
