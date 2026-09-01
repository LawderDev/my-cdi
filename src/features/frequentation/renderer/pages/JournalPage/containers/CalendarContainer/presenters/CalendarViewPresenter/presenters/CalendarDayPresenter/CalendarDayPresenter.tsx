import type { CalendarCell } from '../../../../helpers/buildCalendarMonth'
import { DayCell } from './CalendarDayPresenter.styles'

interface CalendarDayPresenterProps {
  cell: CalendarCell
  onClick: () => void
}

export function CalendarDayPresenter({ cell, onClick }: CalendarDayPresenterProps) {
  return (
    <DayCell
      type="button"
      data-iso={cell.iso}
      data-current-month={cell.isCurrentMonth}
      data-today={cell.isToday}
      data-selected={cell.isSelected}
      data-has-visits={cell.hasVisits}
      onClick={onClick}
    >
      {cell.dayOfMonth}
    </DayCell>
  )
}
