import type { DailyCountDto } from '@statistics-shared'
import { buildTrendPath, DEFAULT_TREND_DIMENSIONS } from '../../helpers/buildTrendPath'

export function useMonthlyTrendChart(dailyCounts: DailyCountDto[]) {
  const trend = buildTrendPath(dailyCounts)
  const { paddingLeft, paddingRight, width } = DEFAULT_TREND_DIMENSIONS
  const innerRight = width - paddingRight
  return { trend, paddingLeft, innerRight }
}
