import type { CalendarCell } from '../../../helpers/buildCalendarMonth'

export interface CalendarViewProps {
  monthLabel: string
  cells: CalendarCell[]
  weekdayLabels: string[]
  onPrev: () => void
  onToday: () => void
  onNext: () => void
  onSelectDay: (iso: string) => void
  prevLabel: string
  todayLabel: string
  nextLabel: string
}
