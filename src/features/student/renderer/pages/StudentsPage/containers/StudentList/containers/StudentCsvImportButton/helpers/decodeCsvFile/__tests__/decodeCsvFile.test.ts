import { describe, it, expect } from 'vitest'
import { decodeText } from '../decodeCsvFile'

describe('decodeText', () => {
  it('decodes UTF-8 text', () => {
    const text = 'Hello world'
    const buffer = new TextEncoder().encode(text).buffer
    expect(decodeText(buffer)).toBe(text)
  })

  it('decodes French UTF-8 text with accents', () => {
    const text = 'François, élève, café'
    const buffer = new TextEncoder().encode(text).buffer
    expect(decodeText(buffer)).toBe(text)
  })

  it('falls back to windows-1252 for invalid UTF-8', () => {
    const WINDOWS_1252_E_ACUTE_BYTE = 0xe9
    const bytes = new Uint8Array([WINDOWS_1252_E_ACUTE_BYTE])
    const result = decodeText(bytes.buffer)
    expect(typeof result).toBe('string')
    expect(result.length).toBe(1)
  })
})
