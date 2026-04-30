import { useState } from 'react'
import type { StudentViewModel } from '@student/types'

export function useStudentsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingStudent, setEditingStudentState] = useState<StudentViewModel | null>(null)

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

  return {
    isAddDialogOpen,
    openAddDialog,
    closeAddDialog,
    editingStudent,
    setEditingStudent,
    closeEditDialog
  }
}
