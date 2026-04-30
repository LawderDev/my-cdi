import dayjs from 'dayjs'

const ISO_DATE_FORMAT = 'YYYY-MM-DD'
const SUNDAY_DOW = 0
const DAYS_PER_WEEK = 7

export interface CalendarCell {
  iso: string
  dayOfMonth: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  hasVisits: boolean
}

function mondayBasedDow(jsDay: number): number {
  // JS getDay(): 0=Sun, 1=Mon, ... 6=Sat. We want 0=Mon ... 6=Sun.
  if (jsDay === SUNDAY_DOW) {
    return DAYS_PER_WEEK - 1
  }
  return jsDay - 1
}

function buildCell(
  cellDate: dayjs.Dayjs,
  isCurrentMonth: boolean,
  todayIso: string,
  selectedDate: string,
  daysWithVisits: Set<string>
): CalendarCell {
  const iso = cellDate.format(ISO_DATE_FORMAT)
  return {
    iso,
    dayOfMonth: cellDate.date(),
    isCurrentMonth,
    isToday: iso === todayIso,
    isSelected: iso === selectedDate,
    hasVisits: daysWithVisits.has(iso)
  }
}

export function buildCalendarMonth(
  viewMonth: dayjs.Dayjs,
  today: dayjs.Dayjs,
  selectedDate: string,
  daysWithVisits: Set<string>
): CalendarCell[] {
  const startOfMonth = viewMonth.startOf('month')
  const endOfMonth = viewMonth.endOf('month')
  const daysInMonth = endOfMonth.date()
  const startDow = mondayBasedDow(startOfMonth.day())
  const cells: CalendarCell[] = []
  const todayIso = today.format(ISO_DATE_FORMAT)

  // Previous-month padding
  const previousMonth = startOfMonth.subtract(1, 'day')
  const daysInPrevious = previousMonth.date()
  for (let i = startDow - 1; i >= 0; i -= 1) {
    const dayNumber = daysInPrevious - i
    const cellDate = previousMonth.date(dayNumber)
    cells.push(buildCell(cellDate, false, todayIso, selectedDate, daysWithVisits))
  }

  // Current-month days
  for (let d = 1; d <= daysInMonth; d += 1) {
    const cellDate = startOfMonth.date(d)
    cells.push(buildCell(cellDate, true, todayIso, selectedDate, daysWithVisits))
  }

  // Next-month padding so total cell count is a multiple of 7
  const remainder = cells.length % DAYS_PER_WEEK
  const padding = remainder === 0 ? 0 : DAYS_PER_WEEK - remainder
  const nextMonth = endOfMonth.add(1, 'day')
  for (let d = 1; d <= padding; d += 1) {
    const cellDate = nextMonth.date(d)
    cells.push(buildCell(cellDate, false, todayIso, selectedDate, daysWithVisits))
  }

  return cells
}
