import { ActivityType } from '@types'
import type { JournalEntryViewModel } from '@frequentation/types'

export function groupEntriesByActivity(
  entries: JournalEntryViewModel[]
): Record<ActivityType, JournalEntryViewModel[]> {
  const result: Record<ActivityType, JournalEntryViewModel[]> = {
    [ActivityType.WORK]: [],
    [ActivityType.READING]: [],
    [ActivityType.COMPUTER]: [],
    [ActivityType.RELAXATION]: [],
    [ActivityType.OTHER]: []
  }
  for (const entry of entries) {
    result[entry.activity].push(entry)
  }
  return result
}
