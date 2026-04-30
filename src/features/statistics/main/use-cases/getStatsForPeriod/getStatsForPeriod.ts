import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'
import type {
  ActivityCountDto,
  ClassCountDto,
  DailyCountDto,
  PeriodRangeDto,
  StatsForPeriodDto
} from '@statistics-shared'
import type { ActivityType } from '@types'

export type StatsResult =
  | { success: true; data: StatsForPeriodDto }
  | { success: false; error: string }

const HOUR_NOON = 12
const PERCENT = 100
const DECIMAL_FACTOR = 10
const DATE_LENGTH = 10

export async function getStatsForPeriod(
  frequentationGateway: FrequentationGateway,
  range: PeriodRangeDto
): Promise<StatsResult> {
  try {
    const frequentations = await frequentationGateway.getByDateRange(range.startDate, range.endDate)

    const totalVisits = frequentations.length
    const dailyCounts = computeDailyCounts(frequentations)
    const activityCounts = computeActivityCounts(frequentations)
    const classCounts = computeClassCounts(frequentations)
    const { morningRate, afternoonRate } = computePeriodRates(frequentations)
    const averagePerDay = computeAveragePerDay(totalVisits, dailyCounts.length)

    return {
      success: true,
      data: {
        totalVisits,
        averagePerDay,
        morningRate,
        afternoonRate,
        dailyCounts,
        activityCounts,
        classCounts
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}

function computeDailyCounts(frequentations: FrequentationWithStudentEntity[]): DailyCountDto[] {
  const counts = new Map<string, number>()
  for (const frequentation of frequentations) {
    const day = frequentation.startsAt.slice(0, DATE_LENGTH)
    counts.set(day, (counts.get(day) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((left, right) => (left.date < right.date ? -1 : 1))
}

function computeActivityCounts(
  frequentations: FrequentationWithStudentEntity[]
): ActivityCountDto[] {
  const counts = new Map<ActivityType, number>()
  for (const frequentation of frequentations) {
    counts.set(frequentation.activity, (counts.get(frequentation.activity) ?? 0) + 1)
  }
  return Array.from(counts.entries()).map(([activity, count]) => ({ activity, count }))
}

function computeClassCounts(frequentations: FrequentationWithStudentEntity[]): ClassCountDto[] {
  const counts = new Map<string, number>()
  for (const frequentation of frequentations) {
    const classe = frequentation.studentClasse
    counts.set(classe, (counts.get(classe) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([classe, count]) => ({ classe, count }))
    .sort((left, right) => right.count - left.count)
}

function computePeriodRates(frequentations: FrequentationWithStudentEntity[]): {
  morningRate: number
  afternoonRate: number
} {
  if (frequentations.length === 0) {
    return { morningRate: 0, afternoonRate: 0 }
  }
  let morning = 0
  for (const frequentation of frequentations) {
    const hour = new Date(frequentation.startsAt).getUTCHours()
    if (hour < HOUR_NOON) {
      morning += 1
    }
  }
  const afternoon = frequentations.length - morning
  return {
    morningRate: roundPercent(morning, frequentations.length),
    afternoonRate: roundPercent(afternoon, frequentations.length)
  }
}

function roundPercent(part: number, total: number): number {
  if (total === 0) {
    return 0
  }
  return Math.round((part / total) * PERCENT)
}

function computeAveragePerDay(totalVisits: number, daysWithVisits: number): number {
  if (daysWithVisits === 0) {
    return 0
  }
  return Math.round((totalVisits / daysWithVisits) * DECIMAL_FACTOR) / DECIMAL_FACTOR
}
