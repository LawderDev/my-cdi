import { useQuery } from '@tanstack/react-query'
import { statisticsKeys } from '../statisticsKeys'
import type { StatsForPeriodDto, PeriodRangeDto } from '@statistics-shared'

export function useStatsForPeriod(range: PeriodRangeDto) {
  return useQuery({
    queryKey: statisticsKeys.period(range),
    queryFn: async (): Promise<StatsForPeriodDto> => {
      const result = await window.electronAPI.statistics.getStats(range)
      if (!result.success) {
        throw new Error(result.error ?? 'Erreur')
      }
      return result.data
    },
    enabled: Boolean(range.startDate && range.endDate)
  })
}
