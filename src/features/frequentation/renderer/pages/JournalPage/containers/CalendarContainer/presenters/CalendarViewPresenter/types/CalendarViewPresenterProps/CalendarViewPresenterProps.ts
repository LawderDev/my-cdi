import type { ReactNode } from 'react'

export interface CalendarViewPresenterProps {
  monthLabel: string
  weekdayNodes: ReactNode[]
  dayNodes: ReactNode[]
  onPrev: () => void
  onToday: () => void
  onNext: () => void
  prevLabel: string
  todayLabel: string
  nextLabel: string
}
