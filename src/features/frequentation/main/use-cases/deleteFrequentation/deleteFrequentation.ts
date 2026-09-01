import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import { ErrorCode } from '@lib/errors'
import type { UseCaseResult } from '@lib/use-case'

export async function deleteFrequentation(
  gateway: FrequentationGateway,
  id: number
): Promise<UseCaseResult<boolean>> {
  const existingFrequentation = await gateway.getById(id)
  if (!existingFrequentation) {
    return {
      success: false,
      error: 'Frequentation not found',
      code: ErrorCode.FREQUENTATION_NOT_FOUND
    }
  }

  try {
    const deleted = await gateway.delete(id)
    return { success: true, data: deleted }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message, code: ErrorCode.DATABASE_ERROR }
  }
}
