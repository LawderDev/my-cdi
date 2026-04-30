import { useQuery } from '@tanstack/react-query'
import { frequentationKeys } from '../frequentationKeys'
import type { JournalEntryDto, FrequentationResponseDto } from '@frequentation-shared'
import type { DateRangeFilter } from '@frequentation/types'

export function useJournalEntries(dateRange: DateRangeFilter) {
  return useQuery({
    queryKey: frequentationKeys.journalEntries(dateRange),
    queryFn: async (): Promise<JournalEntryDto[]> => {
      const result = await window.electronAPI.frequentation.getJournalEntries(dateRange)
      if (!result.success) {
        throw new Error(result.error ?? 'Erreur lors du chargement du journal')
      }
      return result.data
    },
    enabled: Boolean(dateRange.startDate && dateRange.endDate)
  })
}

export function useFrequentationDetail(id: number | null) {
  return useQuery({
    queryKey: id !== null ? frequentationKeys.detail(id) : frequentationKeys.details(),
    queryFn: async (): Promise<FrequentationResponseDto> => {
      if (id === null) {
        throw new Error('Missing id')
      }
      const result = await window.electronAPI.frequentation.get({ id })
      if (!result.success) {
        throw new Error(result.error ?? 'Erreur')
      }
      return result.data
    },
    enabled: id !== null
  })
}
