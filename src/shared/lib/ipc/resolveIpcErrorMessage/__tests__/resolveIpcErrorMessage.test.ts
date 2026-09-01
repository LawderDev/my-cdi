import { describe, it, expect } from 'vitest'
import { resolveIpcErrorMessage } from '../resolveIpcErrorMessage'
import { ErrorCode } from '@lib/errors'

function translate(key: string): string {
  const MESSAGES: Record<string, string> = {
    'errors.studentNotFound': 'Élève introuvable',
    'errors.duplicateIne': 'Un élève avec cet INE existe déjà',
    'errors.frequentationNotFound': 'Fréquentation introuvable',
    'errors.validation': 'Les données envoyées sont invalides',
    'errors.generic': 'Une erreur est survenue',
    'app.unknownError': 'Une erreur inconnue est survenue'
  }
  const message = MESSAGES[key]
  if (message === undefined) {
    throw new Error(`Missing translation: ${key}`)
  }
  return message
}

describe('resolveIpcErrorMessage', () => {
  it('translates a known error code', () => {
    expect(
      resolveIpcErrorMessage(
        { error: 'Student not found', code: ErrorCode.STUDENT_NOT_FOUND },
        translate
      )
    ).toBe('Élève introuvable')
  })

  it('translates the duplicate INE code', () => {
    expect(
      resolveIpcErrorMessage(
        { error: 'A student with this INE already exists', code: ErrorCode.STUDENT_DUPLICATE_INE },
        translate
      )
    ).toBe('Un élève avec cet INE existe déjà')
  })

  it('falls back to the raw error when the code is unknown', () => {
    expect(
      resolveIpcErrorMessage({ error: 'sqlite failure', code: 'SQLITE_BUSY' }, translate)
    ).toBe('sqlite failure')
  })

  it('falls back to the raw error when there is no code', () => {
    expect(resolveIpcErrorMessage({ error: 'raw failure' }, translate)).toBe('raw failure')
  })
})
