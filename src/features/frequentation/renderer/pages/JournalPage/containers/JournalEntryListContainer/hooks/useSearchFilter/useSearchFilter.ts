import { useState } from 'react'

export interface UseSearchFilterReturn {
  searchTerm: string
  setSearchTerm: (next: string) => void
}

export function useSearchFilter(): UseSearchFilterReturn {
  const [searchTerm, setSearchTerm] = useState('')

  return { searchTerm, setSearchTerm }
}
