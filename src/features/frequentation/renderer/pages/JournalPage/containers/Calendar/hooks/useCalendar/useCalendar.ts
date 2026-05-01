import { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

const FRENCH_LOCALE = 'fr'
const ISO_DATE_FORMAT = 'YYYY-MM-DD'
const MONTH_LABEL_FORMAT = 'MMMM YYYY'

interface UseCalendarOptions {
  selectedDate: string
  onSelectDate: (iso: string) => void
}

interface UseCalendarReturn {
  viewMonth: dayjs.Dayjs
  monthLabel: string
  goToPrevMonth: () => void
  goToNextMonth: () => void
  goToToday: () => void
  selectDay: (iso: string) => void
}

function capitalizeFirstChar(value: string): string {
  if (value.length === 0) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function useCalendar({ selectedDate, onSelectDate }: UseCalendarOptions): UseCalendarReturn {
  const [viewMonth, setViewMonth] = useState<dayjs.Dayjs>(() => dayjs(selectedDate))

  const rawMonthLabel = viewMonth.locale(FRENCH_LOCALE).format(MONTH_LABEL_FORMAT)
  const monthLabel = capitalizeFirstChar(rawMonthLabel)

  function goToPrevMonth() {
    setViewMonth((current) => current.subtract(1, 'month'))
  }

  function goToNextMonth() {
    setViewMonth((current) => current.add(1, 'month'))
  }

  function goToToday() {
    const today = dayjs()
    setViewMonth(today)
    onSelectDate(today.format(ISO_DATE_FORMAT))
  }

  function selectDay(iso: string) {
    onSelectDate(iso)
  }

  return {
    viewMonth,
    monthLabel,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDay
  }
}
