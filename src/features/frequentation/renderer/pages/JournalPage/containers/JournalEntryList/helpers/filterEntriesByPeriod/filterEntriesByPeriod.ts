import { getEntryPeriod } from '../getEntryPeriod'
import type { EntryPeriod } from '../getEntryPeriod'
import type { JournalEntryViewModel } from '@frequentation/types'

export type EntryPeriodFilter = 'all' | EntryPeriod

export function filterEntriesByPeriod(
  entries: JournalEntryViewModel[],
  filter: EntryPeriodFilter
): JournalEntryViewModel[] {
  if (filter === 'all') {
    return entries
  }
  return entries.filter((entry) => getEntryPeriod(entry.startsAt) === filter)
}
