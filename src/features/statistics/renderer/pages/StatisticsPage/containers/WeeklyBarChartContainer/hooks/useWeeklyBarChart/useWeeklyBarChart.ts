import type { DailyCountDto } from '@statistics-shared'
import { buildWeeklyBars, type WeeklyBarColors } from '../../helpers/buildWeeklyBars'

export function useWeeklyBarChart(dailyCounts: DailyCountDto[], barColors: WeeklyBarColors) {
  return { bars: buildWeeklyBars(dailyCounts, barColors) }
}
