import { useState, useCallback } from 'react'
import type { StudentViewModel } from '../../../types/view.models'

interface UseJournalStudentSelectionReturn {
  selectedStudents: StudentViewModel[]
  handleSelectionChange: (students: StudentViewModel[]) => void
  clearSelection: () => void
}

export const useJournalStudentSelection = (): UseJournalStudentSelectionReturn => {
  const [selectedStudents, setSelectedStudents] = useState<StudentViewModel[]>([])

  const handleSelectionChange = useCallback((students: StudentViewModel[]) => {
    setSelectedStudents(students)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedStudents([])
  }, [])

  return {
    selectedStudents,
    handleSelectionChange,
    clearSelection
  }
}
