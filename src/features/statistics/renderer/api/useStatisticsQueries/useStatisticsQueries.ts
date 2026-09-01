import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { resolveIpcErrorMessage } from '@lib/ipc/resolveIpcErrorMessage'
import { statisticsKeys } from '../statisticsKeys'
import type { StatsForPeriodDto, PeriodRangeDto } from '@statistics-shared'

export function useStatsForPeriod(range: PeriodRangeDto) {
  const { t } = useTranslation('common')
  return useQuery({
    queryKey: statisticsKeys.period(range),
    queryFn: async (): Promise<StatsForPeriodDto> => {
      const result = await window.electronAPI.statistics.getStats(range)
      if (!result.success) {
        throw new Error(resolveIpcErrorMessage(result, t))
      }
      return result.data
    },
    enabled: Boolean(range.startDate && range.endDate)
  })
}
