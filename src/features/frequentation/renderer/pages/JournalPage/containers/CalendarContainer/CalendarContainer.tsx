import dayjs from 'dayjs'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useCalendar } from './hooks/useCalendar'
import { useMonthEntryCounts } from './hooks/useMonthEntryCounts'
import { buildCalendarMonth } from './helpers/buildCalendarMonth'
import { CalendarDayPresenter } from './presenters/CalendarViewPresenter/presenters/CalendarDayPresenter'
import { CalendarViewPresenter } from './presenters/CalendarViewPresenter'
import { WeekdayLabel } from './CalendarContainer.styles'
import type { CalendarContainerProps } from './types/CalendarContainerProps'

const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

export function CalendarContainer({ selectedDate, onSelectDate }: CalendarContainerProps) {
  const { t } = useTranslation('frequentation')
  const { viewMonth, monthLabel, goToPrevMonth, goToNextMonth, goToToday, selectDay } = useCalendar(
    {
      selectedDate,
      onSelectDate
    }
  )
  const { daysWithVisits } = useMonthEntryCounts(viewMonth)
  const cells = buildCalendarMonth(viewMonth, dayjs(), selectedDate, daysWithVisits).map(
    (cell) => ({
      ...cell,
      onClick: () => {
        selectDay(cell.iso)
      }
    })
  )
  const weekdayNodes: ReactNode[] = WEEKDAY_LABELS.map((label) => (
    <WeekdayLabel key={label} variant="overline">
      {label}
    </WeekdayLabel>
  ))
  const dayNodes: ReactNode[] = cells.map((cell) => (
    <CalendarDayPresenter key={cell.iso} cell={cell} onClick={cell.onClick} />
  ))

  return (
    <CalendarViewPresenter
      monthLabel={monthLabel}
      weekdayNodes={weekdayNodes}
      dayNodes={dayNodes}
      onPrev={goToPrevMonth}
      onNext={goToNextMonth}
      onToday={goToToday}
      prevLabel={t('calendar.previousMonth')}
      todayLabel={t('calendar.today')}
      nextLabel={t('calendar.nextMonth')}
    />
  )
}
