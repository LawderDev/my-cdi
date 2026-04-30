import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { UseCaseResult } from '../types/UseCaseResult'

export async function deleteFrequentation(
  gateway: FrequentationGateway,
  id: number
): Promise<UseCaseResult<boolean>> {
  const existingFrequentation = await gateway.getById(id)
  if (!existingFrequentation) {
    return { success: false, error: `Frequentation with id ${id} not found` }
  }

  try {
    const deleted = await gateway.delete(id)
    return { success: true, data: deleted }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
