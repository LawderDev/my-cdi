import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useEffect } from 'react'
import { MemoryRouter, useLocation } from 'react-router'
import { useAppShellShortcuts } from '../useAppShellShortcuts'
import { ROUTES } from '@lib/routes'

function LocationRecorder(props: { onLocation: (pathname: string) => void }) {
  const location = useLocation()
  useEffect(() => {
    props.onLocation(location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  return null
}

describe('useAppShellShortcuts', () => {
  it('builds ctrl/meta shortcuts for the three routes', () => {
    const { result } = renderHook(() => useAppShellShortcuts(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>
    })

    expect(result.current.map((shortcut) => shortcut.key)).toEqual(['1', '2', '3'])
    expect(result.current.every((shortcut) => shortcut.ctrlOrMeta)).toBe(true)
  })

  it('navigates to the matching route when a shortcut fires', () => {
    const locations: string[] = []
    const { result } = renderHook(() => useAppShellShortcuts(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/']}>
          <LocationRecorder onLocation={(pathname) => locations.push(pathname)} />
          {children}
        </MemoryRouter>
      )
    })

    act(() => {
      result.current[0]?.handler()
    })
    act(() => {
      result.current[1]?.handler()
    })
    act(() => {
      result.current[2]?.handler()
    })

    expect(locations).toEqual([ROUTES.JOURNAL, ROUTES.STATISTICS, ROUTES.STUDENTS])
  })
})
