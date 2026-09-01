import type { DailyCountDto } from '@statistics-shared'
import { buildWeeklyBars } from '../../helpers/buildWeeklyBars'

export function useWeeklyBarChart(dailyCounts: DailyCountDto[]) {
  return { bars: buildWeeklyBars(dailyCounts) }
}
