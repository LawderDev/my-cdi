export enum ErrorCode {
  STUDENT_NOT_FOUND = 'STUDENT_NOT_FOUND',
  STUDENT_DUPLICATE_INE = 'STUDENT_DUPLICATE_INE',
  FREQUENTATION_NOT_FOUND = 'FREQUENTATION_NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  IPC_ERROR = 'IPC_ERROR',
  CSV_PARSE_ERROR = 'CSV_PARSE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export class AppError extends Error {
  readonly code: ErrorCode

  constructor(code: ErrorCode, message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'AppError'
    this.code = code
  }

  toJSON(): { code: ErrorCode; message: string } {
    return { code: this.code, message: this.message }
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}
