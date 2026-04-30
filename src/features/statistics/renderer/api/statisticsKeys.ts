import type { PeriodRangeDto } from '@statistics-shared'

export const statisticsKeys = {
  all: ['statistics'] as const,
  period: (range: PeriodRangeDto) => [...statisticsKeys.all, 'period', range] as const
} as const
