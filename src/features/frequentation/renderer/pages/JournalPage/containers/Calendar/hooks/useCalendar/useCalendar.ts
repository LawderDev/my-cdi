import { useState, useMemo, useCallback } from 'react'
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

  const monthLabel = useMemo(() => {
    const raw = viewMonth.locale(FRENCH_LOCALE).format(MONTH_LABEL_FORMAT)
    return capitalizeFirstChar(raw)
  }, [viewMonth])

  const goToPrevMonth = useCallback(() => {
    setViewMonth((current) => current.subtract(1, 'month'))
  }, [])

  const goToNextMonth = useCallback(() => {
    setViewMonth((current) => current.add(1, 'month'))
  }, [])

  const goToToday = useCallback(() => {
    const today = dayjs()
    setViewMonth(today)
    onSelectDate(today.format(ISO_DATE_FORMAT))
  }, [onSelectDate])

  const selectDay = useCallback(
    (iso: string) => {
      onSelectDate(iso)
    },
    [onSelectDate]
  )

  return {
    viewMonth,
    monthLabel,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDay
  }
}
