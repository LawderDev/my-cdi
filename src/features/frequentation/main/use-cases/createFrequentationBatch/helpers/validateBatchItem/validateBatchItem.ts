import type { CreateFrequentationDto } from '@frequentation-shared'

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateBatchItem(dto: CreateFrequentationDto, index: number): ValidationResult {
  if (!dto.startsAt || dto.startsAt.trim().length === 0) {
    return { valid: false, error: `Item ${index}: startsAt is required` }
  }
  if (!dto.activity || dto.activity.trim().length === 0) {
    return { valid: false, error: `Item ${index}: activity is required` }
  }
  if (!dto.studentId || dto.studentId < 1) {
    return { valid: false, error: `Item ${index}: studentId must be a positive integer` }
  }
  return { valid: true }
}
