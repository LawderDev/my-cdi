import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePeriodFilter } from '../usePeriodFilter'
import '@shared/i18n/config'

describe('usePeriodFilter', () => {
  it('returns all six buttons with translated labels', () => {
    const buttons = renderHook(() => usePeriodFilter('month', vi.fn())).result.current
    expect(buttons).toHaveLength(6)
    expect(buttons.map((button) => button.label)).toEqual([
      'Cette semaine',
      'Ce mois',
      'Ce trimestre',
      'Ce semestre',
      'Cette année',
      'Personnalisé'
    ])
  })

  it('flags only the selected key as active', () => {
    const buttons = renderHook(() => usePeriodFilter('quarter', vi.fn())).result.current
    expect(buttons.filter((button) => button.isActive).map((button) => button.key)).toEqual([
      'quarter'
    ])
  })

  it('forwards clicks for enabled buttons', () => {
    const onChange = vi.fn()
    const buttons = renderHook(() => usePeriodFilter('month', onChange)).result.current
    const week = buttons.find((button) => button.key === 'week')
    week?.onSelect()
    expect(onChange).toHaveBeenCalledWith('week')
  })

  it('swallows clicks for the disabled custom button', () => {
    const onChange = vi.fn()
    const buttons = renderHook(() => usePeriodFilter('month', onChange)).result.current
    const custom = buttons.find((button) => button.key === 'custom')
    expect(custom?.disabled).toBe(true)
    custom?.onSelect()
    expect(onChange).not.toHaveBeenCalled()
  })
})
