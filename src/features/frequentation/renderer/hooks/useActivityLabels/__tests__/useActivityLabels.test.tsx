import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from '@shared/i18n/config'
import { useActivityLabels } from '../useActivityLabels'
import { ActivityType } from '@types'

function Wrapper({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

describe('useActivityLabels', () => {
  it('returns a label resolver covering every ActivityType', () => {
    const { result } = renderHook(() => useActivityLabels(), { wrapper: Wrapper })

    for (const activity of Object.values(ActivityType)) {
      expect(result.current.getLabel(activity)).toBeTypeOf('string')
      expect(result.current.getLabel(activity).length).toBeGreaterThan(0)
    }
  })

  it('exposes a list of all activities for menus', () => {
    const { result } = renderHook(() => useActivityLabels(), { wrapper: Wrapper })

    const allActivities = Object.values(ActivityType)
    expect(result.current.allActivities).toHaveLength(allActivities.length)
  })
})
