import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { UpdateFrequentationDto } from '@frequentation-shared'
import { ErrorCode } from '@lib/errors'
import type { UseCaseResult } from '@lib/use-case'

export async function updateFrequentation(
  gateway: FrequentationGateway,
  id: number,
  dto: UpdateFrequentationDto
): Promise<UseCaseResult<FrequentationEntity>> {
  const existingFrequentation = await gateway.getById(id)
  if (!existingFrequentation) {
    return {
      success: false,
      error: 'Frequentation not found',
      code: ErrorCode.FREQUENTATION_NOT_FOUND
    }
  }

  if (dto.studentId !== undefined && dto.studentId < 1) {
    return { success: false, error: 'Invalid student id', code: ErrorCode.VALIDATION_ERROR }
  }

  if (dto.startsAt !== undefined && dto.startsAt.trim().length === 0) {
    return { success: false, error: 'Start date cannot be empty', code: ErrorCode.VALIDATION_ERROR }
  }

  if (dto.activity !== undefined && dto.activity.trim().length === 0) {
    return { success: false, error: 'Activity cannot be empty', code: ErrorCode.VALIDATION_ERROR }
  }

  try {
    const updated = await gateway.update(id, dto)
    if (!updated) {
      return {
        success: false,
        error: 'Failed to update frequentation',
        code: ErrorCode.DATABASE_ERROR
      }
    }
    return { success: true, data: updated }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message, code: ErrorCode.DATABASE_ERROR }
  }
}
