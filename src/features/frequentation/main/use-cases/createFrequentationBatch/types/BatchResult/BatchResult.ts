import type { FrequentationEntity } from '@frequentation/entities/frequentation'

export interface BatchItemError {
  index: number
  error: string
}

export interface BatchResult {
  created: FrequentationEntity[]
  errors: BatchItemError[]
}
