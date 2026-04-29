import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

const DATE_FORMAT = 'DD/MM/YYYY'
const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'

export function formatDate(date: string): string {
  return dayjs(date).format(DATE_FORMAT)
}

export function formatDateTime(date: string): string {
  return dayjs(date).format(DATETIME_FORMAT)
}
