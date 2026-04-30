import { useState, useCallback } from 'react'
import type { EntryPeriodFilter } from '../../helpers/filterEntriesByPeriod'

interface UseEntryPeriodFilterReturn {
  period: EntryPeriodFilter
  setPeriod: (next: EntryPeriodFilter) => void
}

export function useEntryPeriodFilter(): UseEntryPeriodFilterReturn {
  const [period, setPeriodState] = useState<EntryPeriodFilter>('all')

  const setPeriod = useCallback((next: EntryPeriodFilter) => {
    setPeriodState(next)
  }, [])

  return { period, setPeriod }
}
