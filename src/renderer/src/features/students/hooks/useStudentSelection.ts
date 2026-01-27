import { useState, useCallback } from 'react'
import type { StudentViewModel } from '../../../types/view.models'

interface UseStudentSelectionReturn {
  selectedStudents: StudentViewModel[]
  handleSelectionChange: (students: StudentViewModel[]) => void
  clearSelection: () => void
}

export const useStudentSelection = (): UseStudentSelectionReturn => {
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
