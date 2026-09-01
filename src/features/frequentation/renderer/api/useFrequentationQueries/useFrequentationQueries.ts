import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { frequentationKeys } from '../frequentationKeys'
import type { JournalEntryDto, FrequentationResponseDto } from '@frequentation-shared'
import type { DateRangeFilter } from '@frequentation/types'

export function useJournalEntries(dateRange: DateRangeFilter) {
  const { t } = useTranslation('common')
  return useQuery({
    queryKey: frequentationKeys.journalEntries(dateRange),
    queryFn: async (): Promise<JournalEntryDto[]> => {
      const result = await window.electronAPI.frequentation.getJournalEntries(dateRange)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    enabled: Boolean(dateRange.startDate && dateRange.endDate)
  })
}

export function useFrequentationDetail(id: number | null) {
  const { t } = useTranslation('common')
  return useQuery({
    queryKey: id !== null ? frequentationKeys.detail(id) : frequentationKeys.details(),
    queryFn: async (): Promise<FrequentationResponseDto> => {
      if (id === null) {
        throw new Error('Missing id')
      }
      const result = await window.electronAPI.frequentation.get({ id })
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    enabled: id !== null
  })
}
