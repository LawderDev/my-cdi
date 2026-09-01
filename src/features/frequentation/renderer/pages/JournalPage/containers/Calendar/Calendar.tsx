import dayjs from 'dayjs'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { useCalendar } from './hooks/useCalendar'
import { useMonthEntryCounts } from './hooks/useMonthEntryCounts'
import { buildCalendarMonth } from './helpers/buildCalendarMonth'
import { CalendarDay } from './components/CalendarView/components/CalendarDay'
import { CalendarView } from './components/CalendarView'
import type { CalendarProps } from './types/CalendarProps'
import { DOW_FONT_SIZE_PX, DOW_FONT_WEIGHT } from './components/CalendarView/CalendarView.styles'

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
  const cells = buildCalendarMonth(viewMonth, dayjs(), selectedDate, daysWithVisits).map(
    (cell) => ({
      ...cell,
      onClick: () => {
        selectDay(cell.iso)
      }
    })
  )
  const weekdayNodes: ReactNode[] = WEEKDAY_LABELS.map((label) => (
    <Box
      key={label}
      sx={{
        fontSize: `${DOW_FONT_SIZE_PX}px`,
        fontWeight: DOW_FONT_WEIGHT,
        color: 'var(--text-dim)',
        py: 0.75,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
    >
      {label}
    </Box>
  ))
  const dayNodes: ReactNode[] = cells.map((cell) => (
    <CalendarDay key={cell.iso} cell={cell} onClick={cell.onClick} />
  ))

  return (
    <CalendarView
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
