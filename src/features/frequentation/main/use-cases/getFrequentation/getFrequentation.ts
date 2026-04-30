import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function getFrequentation(
  gateway: FrequentationGateway,
  id: number
): Promise<UseCaseResult<FrequentationEntity>> {
  try {
    const entity = await gateway.getById(id)
    if (!entity) {
      return { success: false, error: 'Fréquentation introuvable' }
    }
    return { success: true, data: entity }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
