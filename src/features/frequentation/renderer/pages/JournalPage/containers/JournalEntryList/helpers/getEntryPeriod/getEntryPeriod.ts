import dayjs from 'dayjs'

const NOON_HOUR = 12

export type EntryPeriod = 'morning' | 'afternoon'

export function getEntryPeriod(startsAt: string): EntryPeriod {
  return dayjs(startsAt).hour() < NOON_HOUR ? 'morning' : 'afternoon'
}
