import type { FrequentationGateway } from '@frequentation/gateways/frequentation'
import type { UseCaseResult } from '../types/UseCaseResult'

export const CLEANUP_RETENTION_YEARS = 2

export interface CleanupResult {
  deletedCount: number
}

export async function cleanupOldFrequentations(
  gateway: FrequentationGateway
): Promise<UseCaseResult<CleanupResult>> {
  try {
    const cutoffDate = new Date()
    cutoffDate.setFullYear(cutoffDate.getFullYear() - CLEANUP_RETENTION_YEARS)
    const cutoffIso = cutoffDate.toISOString()

    const all = await gateway.getAll()
    const oldEntries = all.filter((entry) => entry.startsAt < cutoffIso)

    let deletedCount = 0
    for (const entry of oldEntries) {
      const deleted = await gateway.delete(entry.id)
      if (deleted) {
        deletedCount += 1
      }
    }

    return { success: true, data: { deletedCount } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
