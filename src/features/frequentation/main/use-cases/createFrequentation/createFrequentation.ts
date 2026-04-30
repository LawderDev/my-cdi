import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function createFrequentation(
  gateway: FrequentationGateway,
  dto: CreateFrequentationDto
): Promise<UseCaseResult<FrequentationEntity>> {
  if (!dto.startsAt || dto.startsAt.trim().length === 0) {
    return { success: false, error: 'startsAt is required' }
  }

  if (!dto.activity || dto.activity.trim().length === 0) {
    return { success: false, error: 'activity is required' }
  }

  if (!dto.studentId || dto.studentId < 1) {
    return { success: false, error: 'studentId must be a positive integer' }
  }

  try {
    const entity = await gateway.create(dto)
    return { success: true, data: entity }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
