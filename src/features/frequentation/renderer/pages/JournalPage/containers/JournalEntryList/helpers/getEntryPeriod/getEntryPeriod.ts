import dayjs from 'dayjs'

const NOON_HOUR = 12

export type EntryPeriod = 'matin' | 'aprem'

export function getEntryPeriod(startsAt: string): EntryPeriod {
  return dayjs(startsAt).hour() < NOON_HOUR ? 'matin' : 'aprem'
}
