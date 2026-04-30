import type { DailyCountDto } from '@statistics-shared'

export interface WeeklyBar {
  label: string
  value: number
  color: string
  heightPx: number
}

const BAR_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const SUNDAY_INDEX = 6
const MAX_BAR_HEIGHT = 160
const WEEKEND_COLOR = 'rgba(124,77,255,.4)'
const WEEKDAY_COLOR = 'var(--accent)'
const SUNDAY_DAY_OF_WEEK = 0

function getMondayIndex(date: Date): number {
  const dayOfWeek = date.getUTCDay()
  return dayOfWeek === SUNDAY_DAY_OF_WEEK ? SUNDAY_INDEX : dayOfWeek - 1
}

export function buildWeeklyBars(dailyCounts: DailyCountDto[]): WeeklyBar[] {
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
    color: index >= SUNDAY_INDEX - 1 ? WEEKEND_COLOR : WEEKDAY_COLOR,
    heightPx: Math.round((value / max) * MAX_BAR_HEIGHT)
  }))
}
