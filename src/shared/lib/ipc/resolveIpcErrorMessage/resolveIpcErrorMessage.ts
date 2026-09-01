import { ErrorCode } from '@lib/errors'

const ERROR_MESSAGE_KEYS: Record<string, string> = {
  [ErrorCode.STUDENT_NOT_FOUND]: 'errors.studentNotFound',
  [ErrorCode.STUDENT_DUPLICATE_INE]: 'errors.duplicateIne',
  [ErrorCode.FREQUENTATION_NOT_FOUND]: 'errors.frequentationNotFound',
  [ErrorCode.VALIDATION_ERROR]: 'errors.validation',
  [ErrorCode.DATABASE_ERROR]: 'errors.generic',
  [ErrorCode.IPC_ERROR]: 'errors.generic',
  [ErrorCode.CSV_PARSE_ERROR]: 'errors.generic',
  [ErrorCode.UNKNOWN_ERROR]: 'app.unknownError'
}

interface IpcFailure {
  error: string
  code?: string
}

export function resolveIpcErrorMessage(
  result: IpcFailure,
  translate: (key: string) => string
): string {
  const key = result.code !== undefined ? ERROR_MESSAGE_KEYS[result.code] : undefined
  return key !== undefined ? translate(key) : result.error
}
