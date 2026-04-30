import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const FRENCH_LOCALE = 'fr'
const LONG_FORMAT = 'dddd D MMMM YYYY'
const ISO_DATE_FORMAT = 'YYYY-MM-DD'
const DAY_STEP = 1

dayjs.locale(FRENCH_LOCALE)

export function formatJournalDate(isoDate: string): string {
  return dayjs(isoDate).locale(FRENCH_LOCALE).format(LONG_FORMAT)
}

export function previousDayIso(isoDate: string): string {
  return dayjs(isoDate).subtract(DAY_STEP, 'day').format(ISO_DATE_FORMAT)
}

export function nextDayIso(isoDate: string): string {
  return dayjs(isoDate).add(DAY_STEP, 'day').format(ISO_DATE_FORMAT)
}

export function todayIso(): string {
  return dayjs().format(ISO_DATE_FORMAT)
}

export function isoToDayjs(isoDate: string) {
  return dayjs(isoDate)
}
