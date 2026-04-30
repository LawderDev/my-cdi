import { useState } from 'react'
import type { PeriodKey } from '@statistics/types'
import { useStatsForPeriod } from '@statistics/api/useStatisticsQueries'
import { buildPeriodRange } from '../../helpers/buildPeriodRange'

export function useStatisticsPage() {
  const [period, setPeriod] = useState<PeriodKey>('month')
  const range = buildPeriodRange(period)
  const query = useStatsForPeriod(range)
  return {
    period,
    setPeriod,
    stats: query.data,
    isLoading: query.isLoading,
    error: query.error
  }
}
