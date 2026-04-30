import dayjs from 'dayjs'

const ISO_DATE_FORMAT = 'YYYY-MM-DD'

export interface MonthRange {
  startDate: string
  endDate: string
}

export function monthRange(viewMonth: dayjs.Dayjs): MonthRange {
  const startDate = viewMonth.startOf('month').format(ISO_DATE_FORMAT)
  const endDate = viewMonth.endOf('month').format(ISO_DATE_FORMAT)
  return { startDate, endDate }
}
