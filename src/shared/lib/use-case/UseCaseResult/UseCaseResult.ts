import type { ErrorCode } from '@lib/errors'

export type UseCaseResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: ErrorCode }
