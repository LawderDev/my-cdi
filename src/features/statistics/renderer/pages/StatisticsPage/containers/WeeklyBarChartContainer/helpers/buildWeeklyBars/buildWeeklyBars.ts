import type { DailyCountDto } from '@statistics-shared'

export interface WeeklyBar {
  label: string
  value: number
  color: string
  heightPx: number
}

export interface WeeklyBarColors {
  weekday: string
  weekend: string
}

const BAR_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const SUNDAY_INDEX = 6
const MAX_BAR_HEIGHT = 160
const SUNDAY_DAY_OF_WEEK = 0

function getMondayIndex(date: Date): number {
  const dayOfWeek = date.getUTCDay()
  return dayOfWeek === SUNDAY_DAY_OF_WEEK ? SUNDAY_INDEX : dayOfWeek - 1
}

export function buildWeeklyBars(
  dailyCounts: DailyCountDto[],
  barColors: WeeklyBarColors
): WeeklyBar[] {
  const buckets: number[] = [0, 0, 0, 0, 0, 0, 0]
  for (const count of dailyCounts) {
    const date = new Date(`${count.date}T12:00:00.000Z`)
    if (Number.isNaN(date.getTime())) {
      continue
    }
    const index = getMondayIndex(date)
    const previous = buckets[index] ?? 0
    buckets[index] = previous + count.count
  }
  const max = Math.max(...buckets, 1)
  return buckets.map((value, index) => ({
    label: BAR_LABELS[index] ?? '',
    value,
    color: index >= SUNDAY_INDEX - 1 ? barColors.weekend : barColors.weekday,
    heightPx: Math.round((value / max) * MAX_BAR_HEIGHT)
  }))
}
