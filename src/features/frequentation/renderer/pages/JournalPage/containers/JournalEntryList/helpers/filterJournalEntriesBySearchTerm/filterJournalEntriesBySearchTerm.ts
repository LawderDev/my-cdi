import dayjs from 'dayjs'
import type { JournalEntryViewModel } from '@frequentation/types'

export function filterJournalEntriesBySearchTerm(
  entries: JournalEntryViewModel[],
  searchTerm: string
): JournalEntryViewModel[] {
  if (!searchTerm.trim()) {
    return entries
  }

  const term = searchTerm.trim().toLowerCase()

  return entries.filter((entry) => {
    const time = dayjs(entry.startsAt).format('HH:mm')
    return (
      entry.student.displayName.toLowerCase().includes(term) ||
      entry.student.classe.toLowerCase().includes(term) ||
      entry.activityLabel.toLowerCase().includes(term) ||
      time.includes(term)
    )
  })
}
