import { useState } from 'react'

const EMPTY_SEARCH = ''

export function useStudentFilters() {
  const [searchTerm, setSearchTerm] = useState<string>(EMPTY_SEARCH)
  const [classeFilter, setClasseFilter] = useState<string | null>(null)

  function clearFilters() {
    setSearchTerm(EMPTY_SEARCH)
    setClasseFilter(null)
  }

  return {
    searchTerm,
    setSearchTerm,
    classeFilter,
    setClasseFilter,
    clearFilters
  }
}
