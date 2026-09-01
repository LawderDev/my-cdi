import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'
import { ErrorCode } from '@lib/errors'
import type { UseCaseResult } from '@lib/use-case'

export async function createFrequentation(
  gateway: FrequentationGateway,
  dto: CreateFrequentationDto
): Promise<UseCaseResult<FrequentationEntity>> {
  if (!dto.startsAt || dto.startsAt.trim().length === 0) {
    return { success: false, error: 'Start date is required', code: ErrorCode.VALIDATION_ERROR }
  }

  if (!dto.activity || dto.activity.trim().length === 0) {
    return { success: false, error: 'Activity is required', code: ErrorCode.VALIDATION_ERROR }
  }

  if (!dto.studentId || dto.studentId < 1) {
    return { success: false, error: 'Invalid student id', code: ErrorCode.VALIDATION_ERROR }
  }

  try {
    const entity = await gateway.create(dto)
    return { success: true, data: entity }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message, code: ErrorCode.DATABASE_ERROR }
  }
}
