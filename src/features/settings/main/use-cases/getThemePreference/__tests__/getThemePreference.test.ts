import { describe, it, expect, vi } from 'vitest'
import type { SettingGateway } from '@settings/gateways/setting'
import type { SettingEntity } from '@settings/entities/setting'
import { DEFAULT_THEME_PREFERENCE, THEME_STORAGE_KEY } from '@types'
import { getThemePreference } from '../getThemePreference'

const PURPLE_DARK: SettingEntity = { key: THEME_STORAGE_KEY, value: 'purple:dark' }
const PINK_LIGHT: SettingEntity = { key: THEME_STORAGE_KEY, value: 'pink:light' }

function createMockSettingGateway(row: SettingEntity | null): SettingGateway {
  return {
    getByKey: vi.fn().mockResolvedValue(row),
    create: vi.fn().mockResolvedValue(PURPLE_DARK),
    update: vi.fn().mockResolvedValue(PURPLE_DARK)
  }
}

describe('getThemePreference', () => {
  it('returns the stored preference when the row is valid', async () => {
    const gateway = createMockSettingGateway(PINK_LIGHT)

    const result = await getThemePreference(gateway)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({ accent: 'pink', mode: 'light' })
    }
    expect(gateway.getByKey).toHaveBeenCalledWith(THEME_STORAGE_KEY)
  })

  it('returns the default preference when no row exists', async () => {
    const gateway = createMockSettingGateway(null)

    const result = await getThemePreference(gateway)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(DEFAULT_THEME_PREFERENCE)
    }
  })

  it('returns the default preference when the stored value is unparsable', async () => {
    const gateway = createMockSettingGateway({ key: THEME_STORAGE_KEY, value: 'chartreuse:vivid' })

    const result = await getThemePreference(gateway)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual(DEFAULT_THEME_PREFERENCE)
    }
  })

  it('returns an error when the gateway throws', async () => {
    const gateway = createMockSettingGateway(null)
    vi.mocked(gateway.getByKey).mockRejectedValue(new Error('db locked'))

    const result = await getThemePreference(gateway)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('db locked')
    }
  })
})
