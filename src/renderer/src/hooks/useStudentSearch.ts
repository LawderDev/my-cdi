import { useState, useMemo, useCallback } from 'react'
import type { StudentViewModel } from '../types/view.models'

interface UseStudentSearchParams {
  allStudents: StudentViewModel[]
}

export const useStudentSearch = ({
  allStudents
}: UseStudentSearchParams): {
  searchTerm: string
  filteredStudents: StudentViewModel[]
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  clearSearch: () => void
} => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) {
      return allStudents
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim()

    return allStudents.filter(
      (student) =>
        student.nom.toLowerCase().includes(lowerSearchTerm) ||
        student.prenom.toLowerCase().includes(lowerSearchTerm) ||
        student.classe.toLowerCase().includes(lowerSearchTerm)
    )
  }, [allStudents, searchTerm])

  return {
    searchTerm,
    filteredStudents,
    handleSearch,
    clearSearch
  }
}
