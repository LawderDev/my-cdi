import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { CreateFrequentationBatchDto } from '@frequentation-shared'
import type { UseCaseResult } from '@lib/use-case'
import type { BatchResult } from './types/BatchResult'
import { createFrequentationBatchSchema } from './validations/createFrequentationBatchSchema'
import { validateBatchItem } from './helpers/validateBatchItem'

export async function createFrequentationBatch(
  gateway: FrequentationGateway,
  dto: CreateFrequentationBatchDto
): Promise<UseCaseResult<BatchResult>> {
  const parsed = createFrequentationBatchSchema.safeParse(dto)
  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }

  const batch: BatchResult = { created: [], errors: [] }

  let index = 0
  for (const item of dto.frequentations) {
    const validation = validateBatchItem(item, index)

    if (!validation.valid) {
      batch.errors.push({ index, error: validation.error ?? 'Unknown validation error' })
      index += 1
      continue
    }

    try {
      const entity = await gateway.create(item)
      batch.created.push(entity)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      batch.errors.push({ index, error: message })
    }

    index += 1
  }

  return { success: true, data: batch }
}
