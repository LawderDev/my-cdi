import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { CreateFrequentationDto } from '@frequentation-shared'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function createFrequentation(
  gateway: FrequentationGateway,
  dto: CreateFrequentationDto
): Promise<UseCaseResult<FrequentationEntity>> {
  if (!dto.startsAt || dto.startsAt.trim().length === 0) {
    return { success: false, error: 'La date de début est obligatoire' }
  }

  if (!dto.activity || dto.activity.trim().length === 0) {
    return { success: false, error: "L'activité est obligatoire" }
  }

  if (!dto.studentId || dto.studentId < 1) {
    return { success: false, error: "L'identifiant de l'élève est invalide" }
  }

  try {
    const entity = await gateway.create(dto)
    return { success: true, data: entity }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
