import { AppError, ErrorCode } from '@lib/errors'
import type { UseCaseResult } from './UseCaseResult'

export function unwrap<T>(result: UseCaseResult<T>): T {
  if (!result.success) {
    throw new AppError(result.code ?? ErrorCode.UNKNOWN_ERROR, result.error)
  }
  return result.data
}
