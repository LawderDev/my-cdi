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
    return { success: false, error: 'Fréquentation introuvable' }
  }

  if (dto.studentId !== undefined && dto.studentId < 1) {
    return { success: false, error: "L'identifiant de l'élève est invalide" }
  }

  if (dto.startsAt !== undefined && dto.startsAt.trim().length === 0) {
    return { success: false, error: 'La date de début ne peut pas être vide' }
  }

  if (dto.activity !== undefined && dto.activity.trim().length === 0) {
    return { success: false, error: "L'activité ne peut pas être vide" }
  }

  try {
    const updated = await gateway.update(id, dto)
    if (!updated) {
      return { success: false, error: 'Erreur lors de la mise à jour' }
    }
    return { success: true, data: updated }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
