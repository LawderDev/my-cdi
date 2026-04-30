import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import type { ReactNode } from 'react'
import { ROUTES } from '@lib/routes'
import { useSidebar } from '../useSidebar'

function makeWrapper(initialPath: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
  }
}

const EXPECTED_ITEM_COUNT = 3

describe('useSidebar', () => {
  it('exposes the sidebar items and journal active path on the journal route', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(ROUTES.JOURNAL)
    })
    expect(result.current.items).toHaveLength(EXPECTED_ITEM_COUNT)
    expect(result.current.activePath).toBe(ROUTES.JOURNAL)
  })

  it('resolves activePath to STUDENTS when on a students sub-route', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(`${ROUTES.STUDENTS}/123`)
    })
    expect(result.current.activePath).toBe(ROUTES.STUDENTS)
  })

  it('resolves activePath to STATISTICS when on a statistics sub-route', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(`${ROUTES.STATISTICS}/anything`)
    })
    expect(result.current.activePath).toBe(ROUTES.STATISTICS)
  })

  it('exposes a navigate function', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(ROUTES.JOURNAL)
    })
    expect(typeof result.current.navigate).toBe('function')
  })
})
