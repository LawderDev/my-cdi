import type { PeriodRangeDto } from '@statistics-shared'
import type { PeriodKey } from '@statistics/types'

const DATE_END = 10
const MONTH_OFFSET = 1
const QUARTER_LENGTH = 3
const SEMESTER_FIRST_END_MONTH = 5
const SEMESTER_SECOND_START_MONTH = 6
const SEMESTER_SECOND_END_MONTH = 11
const DAYS_IN_WEEK = 7
const SUNDAY = 0
const PADDING = 2

function pad(value: number): string {
  return String(value).padStart(PADDING, '0')
}

function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${pad(month + MONTH_OFFSET)}-${pad(day)}`
}

function startOfWeek(reference: Date): Date {
  const result = new Date(reference)
  const dayOfWeek = result.getUTCDay()
  // Treat Monday as the start of the week.
  const offset = dayOfWeek === SUNDAY ? DAYS_IN_WEEK - MONTH_OFFSET : dayOfWeek - MONTH_OFFSET
  result.setUTCDate(result.getUTCDate() - offset)
  return result
}

function buildWeekRange(today: Date): PeriodRangeDto {
  const start = startOfWeek(today)
  const end = new Date(start)
  end.setUTCDate(start.getUTCDate() + (DAYS_IN_WEEK - MONTH_OFFSET))
  return {
    startDate: start.toISOString().slice(0, DATE_END),
    endDate: end.toISOString().slice(0, DATE_END)
  }
}

function buildMonthRange(today: Date): PeriodRangeDto {
  const year = today.getUTCFullYear()
  const month = today.getUTCMonth()
  const start = new Date(Date.UTC(year, month, 1))
  const end = new Date(Date.UTC(year, month + MONTH_OFFSET, 0))
  return {
    startDate: start.toISOString().slice(0, DATE_END),
    endDate: end.toISOString().slice(0, DATE_END)
  }
}

function buildQuarterRange(today: Date): PeriodRangeDto {
  const year = today.getUTCFullYear()
  const month = today.getUTCMonth()
  const quarterStartMonth = month - (month % QUARTER_LENGTH)
  const start = new Date(Date.UTC(year, quarterStartMonth, 1))
  const end = new Date(Date.UTC(year, quarterStartMonth + QUARTER_LENGTH, 0))
  return {
    startDate: start.toISOString().slice(0, DATE_END),
    endDate: end.toISOString().slice(0, DATE_END)
  }
}

function buildSemesterRange(today: Date): PeriodRangeDto {
  const year = today.getUTCFullYear()
  const month = today.getUTCMonth()
  if (month <= SEMESTER_FIRST_END_MONTH) {
    return {
      startDate: toIsoDate(year, 0, 1),
      endDate: toIsoDate(year, SEMESTER_FIRST_END_MONTH, getLastDay(year, SEMESTER_FIRST_END_MONTH))
    }
  }
  return {
    startDate: toIsoDate(year, SEMESTER_SECOND_START_MONTH, 1),
    endDate: toIsoDate(year, SEMESTER_SECOND_END_MONTH, getLastDay(year, SEMESTER_SECOND_END_MONTH))
  }
}

function buildYearRange(today: Date): PeriodRangeDto {
  const year = today.getUTCFullYear()
  return {
    startDate: toIsoDate(year, 0, 1),
    endDate: toIsoDate(year, SEMESTER_SECOND_END_MONTH, getLastDay(year, SEMESTER_SECOND_END_MONTH))
  }
}

function getLastDay(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + MONTH_OFFSET, 0)).getUTCDate()
}

export function buildPeriodRange(key: PeriodKey, today: Date = new Date()): PeriodRangeDto {
  if (key === 'week') {
    return buildWeekRange(today)
  }
  if (key === 'month') {
    return buildMonthRange(today)
  }
  if (key === 'quarter') {
    return buildQuarterRange(today)
  }
  if (key === 'semester') {
    return buildSemesterRange(today)
  }
  if (key === 'year') {
    return buildYearRange(today)
  }
  // 'custom' falls back to the current month so the query stays enabled.
  return buildMonthRange(today)
}
