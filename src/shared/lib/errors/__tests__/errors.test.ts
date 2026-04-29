import { describe, it, expect } from 'vitest'
import { AppError, ErrorCode, isAppError } from '../errors'

describe('AppError', () => {
  it('creates an error with code and message', () => {
    const error = new AppError(ErrorCode.STUDENT_NOT_FOUND, 'Student 42 not found')
    expect(error.code).toBe(ErrorCode.STUDENT_NOT_FOUND)
    expect(error.message).toBe('Student 42 not found')
    expect(error.name).toBe('AppError')
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(AppError)
  })

  it('creates an error with cause', () => {
    const cause = new Error('DB connection failed')
    const error = new AppError(ErrorCode.DATABASE_ERROR, 'DB error', { cause })
    expect(error.cause).toBe(cause)
  })

  it('serializes to JSON with code', () => {
    const error = new AppError(ErrorCode.VALIDATION_ERROR, 'Invalid input')
    const json = error.toJSON()
    expect(json.code).toBe(ErrorCode.VALIDATION_ERROR)
    expect(json.message).toBe('Invalid input')
  })
})

describe('isAppError', () => {
  it('returns true for AppError instances', () => {
    const error = new AppError(ErrorCode.STUDENT_NOT_FOUND, 'Not found')
    expect(isAppError(error)).toBe(true)
  })

  it('returns false for regular Error', () => {
    expect(isAppError(new Error('regular'))).toBe(false)
  })

  it('returns false for non-error values', () => {
    expect(isAppError(null)).toBe(false)
    expect(isAppError(undefined)).toBe(false)
    expect(isAppError('string')).toBe(false)
  })
})
