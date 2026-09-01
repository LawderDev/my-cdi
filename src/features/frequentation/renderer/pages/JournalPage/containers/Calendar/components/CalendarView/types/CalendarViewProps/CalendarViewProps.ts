import type { CalendarCell } from '../../../../helpers/buildCalendarMonth'

export interface CalendarDayCell extends CalendarCell {
  onClick: () => void
}

export interface CalendarViewProps {
  monthLabel: string
  cells: CalendarDayCell[]
  weekdayLabels: string[]
  onPrev: () => void
  onToday: () => void
  onNext: () => void
  prevLabel: string
  todayLabel: string
  nextLabel: string
}
