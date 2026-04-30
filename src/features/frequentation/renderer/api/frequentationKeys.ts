export const frequentationKeys = {
  all: ['frequentations'] as const,
  lists: () => [...frequentationKeys.all, 'list'] as const,
  list: (filters: { studentId?: number }) => [...frequentationKeys.lists(), filters] as const,
  byDate: (date: string) => [...frequentationKeys.all, 'byDate', date] as const,
  details: () => [...frequentationKeys.all, 'detail'] as const,
  detail: (id: number) => [...frequentationKeys.details(), id] as const,
  journalEntries: (dateRange: { startDate: string; endDate: string }) =>
    [...frequentationKeys.all, 'journalEntries', dateRange] as const
} as const
