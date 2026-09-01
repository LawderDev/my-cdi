import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { FrequentationEntity } from '@frequentation/entities/frequentation'
import { ErrorCode } from '@lib/errors'
import type { UseCaseResult } from '@lib/use-case'

export async function getFrequentation(
  gateway: FrequentationGateway,
  id: number
): Promise<UseCaseResult<FrequentationEntity>> {
  try {
    const entity = await gateway.getById(id)
    if (!entity) {
      return {
        success: false,
        error: 'Frequentation not found',
        code: ErrorCode.FREQUENTATION_NOT_FOUND
      }
    }
    return { success: true, data: entity }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message, code: ErrorCode.DATABASE_ERROR }
  }
}
