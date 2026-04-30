import type { ActivityType } from '@types'

export interface PeriodRangeDto {
  startDate: string
  endDate: string
}

export interface DailyCountDto {
  date: string
  count: number
}

export interface ActivityCountDto {
  activity: ActivityType
  count: number
}

export interface ClassCountDto {
  classe: string
  count: number
}

export interface StatsForPeriodDto {
  totalVisits: number
  averagePerDay: number
  morningRate: number
  afternoonRate: number
  dailyCounts: DailyCountDto[]
  activityCounts: ActivityCountDto[]
  classCounts: ClassCountDto[]
}
