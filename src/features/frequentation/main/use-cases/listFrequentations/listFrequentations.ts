import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationWithStudentEntity } from '@frequentation/entities/frequentation'
import type { DateRangeDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'

export interface ListFrequentationsFilters {
  studentId?: number
  dateRange?: DateRangeDto
}

export async function listFrequentations(
  gateway: FrequentationGateway,
  filters?: ListFrequentationsFilters
): Promise<UseCaseResult<FrequentationWithStudentEntity[]>> {
  try {
    if (filters?.studentId) {
      const results = await gateway.getByStudentId(filters.studentId)
      return { success: true, data: results }
    }

    if (filters?.dateRange) {
      const results = await gateway.getByDateRange(
        filters.dateRange.startDate,
        filters.dateRange.endDate
      )
      return { success: true, data: results }
    }

    const results = await gateway.getAll()
    return { success: true, data: results }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
