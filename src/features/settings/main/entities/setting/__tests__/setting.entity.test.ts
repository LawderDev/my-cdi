import { describe, it, expect } from 'vitest'
import { settingEntitySchema } from '../setting.entity'

const THEME_STORAGE_KEY = 'theme'
const THEME_VALUE = 'purple:dark'

describe('settingEntitySchema', () => {
  it('accepts a valid key/value pair', () => {
    const result = settingEntitySchema.parse({ key: THEME_STORAGE_KEY, value: THEME_VALUE })
    expect(result).toEqual({ key: THEME_STORAGE_KEY, value: THEME_VALUE })
  })

  it('rejects an empty key', () => {
    expect(() => settingEntitySchema.parse({ key: '', value: THEME_VALUE })).toThrow()
  })

  it('rejects an empty value', () => {
    expect(() => settingEntitySchema.parse({ key: THEME_STORAGE_KEY, value: '' })).toThrow()
  })
})
