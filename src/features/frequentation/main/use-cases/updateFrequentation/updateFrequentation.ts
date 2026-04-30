import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { UpdateFrequentationDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function updateFrequentation(
  gateway: FrequentationGateway,
  id: number,
  dto: UpdateFrequentationDto
): Promise<UseCaseResult<FrequentationEntity>> {
  const existingFrequentation = await gateway.getById(id)
  if (!existingFrequentation) {
    return { success: false, error: `Frequentation with id ${id} not found` }
  }

  if (dto.studentId !== undefined && dto.studentId < 1) {
    return { success: false, error: 'studentId must be a positive integer' }
  }

  if (dto.startsAt !== undefined && dto.startsAt.trim().length === 0) {
    return { success: false, error: 'startsAt must not be empty' }
  }

  if (dto.activity !== undefined && dto.activity.trim().length === 0) {
    return { success: false, error: 'activity must not be empty' }
  }

  try {
    const updated = await gateway.update(id, dto)
    if (!updated) {
      return { success: false, error: 'Update returned null' }
    }
    return { success: true, data: updated }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
