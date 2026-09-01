import { useState } from 'react'
import { useStudentList } from '@student/api/useStudentQueries'
import { filterStudentRows } from '../../helpers/filterStudentRows'
import { sortStudentRows } from '../../helpers/sortStudentRows'
import type { StudentSortConfig } from '@student/types'

const DEFAULT_SORT_CONFIG: StudentSortConfig = {
  field: 'nom',
  direction: 'asc'
}

const EMPTY_SEARCH_TERM = ''

export function useStudentListData() {
  const { data, isLoading, isError, error } = useStudentList()
  const [searchTerm, setSearchTerm] = useState<string>(EMPTY_SEARCH_TERM)
  const [sortConfig, setSortConfig] = useState<StudentSortConfig>(DEFAULT_SORT_CONFIG)

  const students = data ?? []

  const filteredStudents = sortStudentRows(filterStudentRows(students, searchTerm), sortConfig)

  function clearSearch() {
    setSearchTerm(EMPTY_SEARCH_TERM)
  }

  return {
    students,
    filteredStudents,
    searchTerm,
    setSearchTerm,
    clearSearch,
    sortConfig,
    setSortConfig,
    isLoading,
    isError,
    error
  }
}
