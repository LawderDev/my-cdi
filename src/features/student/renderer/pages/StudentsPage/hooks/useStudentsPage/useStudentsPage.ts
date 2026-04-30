import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStudentList } from '@student/api/useStudentQueries'
import { getStudentsPageTitle } from '../../helpers/getStudentsPageTitle'
import type { StudentViewModel } from '@student/types'

const EMPTY_COUNT = 0

export function useStudentsPage() {
  const { t } = useTranslation('student')
  const { data } = useStudentList()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingStudent, setEditingStudentState] = useState<StudentViewModel | null>(null)
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false)

  const studentCount = data?.length ?? EMPTY_COUNT
  const title = getStudentsPageTitle(t('title'), studentCount)

  function openAddDialog() {
    setIsAddDialogOpen(true)
  }

  function closeAddDialog() {
    setIsAddDialogOpen(false)
  }

  function setEditingStudent(student: StudentViewModel) {
    setEditingStudentState(student)
  }

  function closeEditDialog() {
    setEditingStudentState(null)
  }

  function openCsvImport() {
    setIsCsvImportOpen(true)
  }

  function closeCsvImport() {
    setIsCsvImportOpen(false)
  }

  return {
    title,
    isAddDialogOpen,
    openAddDialog,
    closeAddDialog,
    editingStudent,
    setEditingStudent,
    closeEditDialog,
    isCsvImportOpen,
    openCsvImport,
    closeCsvImport
  }
}
