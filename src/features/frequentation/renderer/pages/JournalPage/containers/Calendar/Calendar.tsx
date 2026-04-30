import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { useCalendar } from './hooks/useCalendar'
import { useMonthEntryCounts } from './hooks/useMonthEntryCounts'
import { buildCalendarMonth } from './helpers/buildCalendarMonth'
import { CalendarView } from './components/CalendarView'
import type { CalendarProps } from './types/CalendarProps'

const WEEKDAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const { t } = useTranslation('frequentation')
  const { viewMonth, monthLabel, goToPrevMonth, goToNextMonth, goToToday, selectDay } = useCalendar(
    {
      selectedDate,
      onSelectDate
    }
  )
  const { daysWithVisits } = useMonthEntryCounts(viewMonth)
  const cells = buildCalendarMonth(viewMonth, dayjs(), selectedDate, daysWithVisits)

  return (
    <CalendarView
      monthLabel={monthLabel}
      cells={cells}
      weekdayLabels={WEEKDAY_LABELS}
      onPrev={goToPrevMonth}
      onNext={goToNextMonth}
      onToday={goToToday}
      onSelectDay={selectDay}
      prevLabel={t('calendar.previousMonth')}
      todayLabel={t('calendar.today')}
      nextLabel={t('calendar.nextMonth')}
    />
  )
}
