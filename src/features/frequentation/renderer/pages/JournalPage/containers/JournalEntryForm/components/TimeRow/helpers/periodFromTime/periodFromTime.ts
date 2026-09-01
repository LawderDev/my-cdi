const NOON_HOUR = 12

export type TimePeriod = 'morning' | 'afternoon'

export function periodFromTime(time: string): TimePeriod {
  const [hourPart] = time.split(':')
  const hour = Number.parseInt(hourPart ?? '', 10)
  if (!Number.isFinite(hour) || hour < NOON_HOUR) {
    return 'morning'
  }
  return 'afternoon'
}
