import { describe, it, expect, vi } from 'vitest'
import type { SettingGateway } from '@settings/gateways/setting'
import type { SettingEntity } from '@settings/entities/setting'
import { THEME_STORAGE_KEY } from '@types'
import { setThemePreference } from '../setThemePreference'

const PINK_LIGHT: SettingEntity = { key: THEME_STORAGE_KEY, value: 'pink:light' }

function createMockSettingGateway(row: SettingEntity | null): SettingGateway {
  return {
    getByKey: vi.fn().mockResolvedValue(row),
    create: vi.fn().mockResolvedValue(PINK_LIGHT),
    update: vi.fn().mockResolvedValue(PINK_LIGHT)
  }
}

describe('setThemePreference', () => {
  it('creates the setting when no row exists yet', async () => {
    const gateway = createMockSettingGateway(null)

    const result = await setThemePreference(gateway, { accent: 'pink', mode: 'light' })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({ accent: 'pink', mode: 'light' })
    }
    expect(gateway.getByKey).toHaveBeenCalledWith(THEME_STORAGE_KEY)
    expect(gateway.create).toHaveBeenCalledWith({ key: THEME_STORAGE_KEY, value: 'pink:light' })
    expect(gateway.update).not.toHaveBeenCalled()
  })

  it('updates the setting when a row already exists', async () => {
    const gateway = createMockSettingGateway({ key: THEME_STORAGE_KEY, value: 'purple:dark' })

    const result = await setThemePreference(gateway, { accent: 'blue', mode: 'light' })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toEqual({ accent: 'blue', mode: 'light' })
    }
    expect(gateway.update).toHaveBeenCalledWith(THEME_STORAGE_KEY, 'blue:light')
    expect(gateway.create).not.toHaveBeenCalled()
  })

  it('rejects an invalid accent without touching the gateway writes', async () => {
    const gateway = createMockSettingGateway(null)

    const result = await setThemePreference(
      gateway,
      // @ts-expect-error exercising the runtime validation of invalid input
      { accent: 'chartreuse', mode: 'light' }
    )

    expect(result.success).toBe(false)
    expect(gateway.getByKey).not.toHaveBeenCalled()
    expect(gateway.create).not.toHaveBeenCalled()
    expect(gateway.update).not.toHaveBeenCalled()
  })

  it('rejects an invalid mode', async () => {
    const gateway = createMockSettingGateway(null)

    const result = await setThemePreference(
      gateway,
      // @ts-expect-error exercising the runtime validation of invalid input
      { accent: 'pink', mode: 'sepia' }
    )

    expect(result.success).toBe(false)
    expect(gateway.create).not.toHaveBeenCalled()
  })

  it('returns an error when the gateway throws', async () => {
    const gateway = createMockSettingGateway(null)
    vi.mocked(gateway.create).mockRejectedValue(new Error('db locked'))

    const result = await setThemePreference(gateway, { accent: 'pink', mode: 'light' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('db locked')
    }
  })
})
