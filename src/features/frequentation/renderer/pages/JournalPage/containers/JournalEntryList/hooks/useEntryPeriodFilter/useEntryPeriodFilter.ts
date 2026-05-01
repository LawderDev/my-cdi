import { useState } from 'react'
import type { EntryPeriodFilter } from '../../helpers/filterEntriesByPeriod'

interface UseEntryPeriodFilterReturn {
  period: EntryPeriodFilter
  setPeriod: (next: EntryPeriodFilter) => void
}

export function useEntryPeriodFilter(): UseEntryPeriodFilterReturn {
  const [period, setPeriod] = useState<EntryPeriodFilter>('all')

  return { period, setPeriod }
}
