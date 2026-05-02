import { describe, it, expect } from 'vitest'
import { getValidationErrorMessage } from '../getValidationErrorMessage'

function createTranslate(): (key: string, options?: Record<string, unknown>) => string {
  return (key: string, options?: Record<string, unknown>) => {
    if (options) {
      return `${key}(${JSON.stringify(options)})`
    }
    return key
  }
}

describe('getValidationErrorMessage', () => {
  it('returns undefined when there is no error', () => {
    const t = createTranslate()
    expect(getValidationErrorMessage('nom', false, t)).toBeUndefined()
  })

  it('returns translated required message when there is an error', () => {
    const t = createTranslate()
    const result = getValidationErrorMessage('nom', true, t)
    expect(result).toContain('validation.required')
    expect(result).toContain('fields.nom')
  })
})
