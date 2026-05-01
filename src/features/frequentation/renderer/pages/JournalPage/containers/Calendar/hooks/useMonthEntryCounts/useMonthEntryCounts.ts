import dayjs from 'dayjs'
import { useJournalEntries } from '@frequentation/api/useFrequentationQueries'
import { monthRange } from '../../helpers/monthRange'

const ISO_DATE_LENGTH = 10

interface UseMonthEntryCountsReturn {
  daysWithVisits: Set<string>
  isLoading: boolean
}

export function useMonthEntryCounts(viewMonth: dayjs.Dayjs): UseMonthEntryCountsReturn {
  const { startDate, endDate } = monthRange(viewMonth)
  const { data, isLoading } = useJournalEntries({ startDate, endDate })

  const daysWithVisits = new Set<string>()
  if (data) {
    for (const entry of data) {
      const startsAt = entry.frequentation.startsAt
      daysWithVisits.add(startsAt.slice(0, ISO_DATE_LENGTH))
    }
  }

  return { daysWithVisits, isLoading }
}
