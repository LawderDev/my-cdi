import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ROUTES } from '@lib/routes'
import { useSidebar } from '../useSidebar'

function LocationRecorder(props: { onLocation: (pathname: string) => void }) {
  const location = useLocation()
  useEffect(() => {
    props.onLocation(location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  return null
}

function makeWrapper(initialPath: string, onLocation?: (pathname: string) => void) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[initialPath]}>
          {onLocation !== undefined ? <LocationRecorder onLocation={onLocation} /> : null}
          {children}
        </MemoryRouter>
      </I18nextProvider>
    )
  }
}

const EXPECTED_NODE_COUNT = 3

describe('useSidebar', () => {
  it('builds one nav button node per route', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(ROUTES.JOURNAL)
    })
    expect(result.current.navButtonNodes).toHaveLength(EXPECTED_NODE_COUNT)
  })

  it('resolves activePath to STUDENTS when on a students sub-route', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(`${ROUTES.STUDENTS}/123`)
    })
    expect(
      (result.current.navButtonNodes[2] as { props: { ariaCurrent?: string } }).props.ariaCurrent
    ).toBe('page')
  })

  it('resolves activePath to STATISTICS when on a statistics sub-route', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(`${ROUTES.STATISTICS}/anything`)
    })
    expect(
      (result.current.navButtonNodes[1] as { props: { ariaCurrent?: string } }).props.ariaCurrent
    ).toBe('page')
  })

  it('marks only the active route button with aria-current="page"', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(ROUTES.JOURNAL)
    })
    expect(
      (result.current.navButtonNodes[0] as { props: { ariaCurrent?: string } }).props.ariaCurrent
    ).toBe('page')
    expect(
      (result.current.navButtonNodes[1] as { props: { ariaCurrent?: string } }).props.ariaCurrent
    ).toBeUndefined()
  })

  it('navigates to the item path when its node is clicked', () => {
    const locations: string[] = []
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(ROUTES.JOURNAL, (pathname) => locations.push(pathname))
    })
    const statisticsNode = result.current.navButtonNodes[1] as {
      props: { onClick: () => void }
    }
    act(() => {
      statisticsNode.props.onClick()
    })
    expect(locations).toEqual(['/', ROUTES.STATISTICS])
  })

  it('navigates to SETTINGS when the settings button is clicked', () => {
    const locations: string[] = []
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(ROUTES.JOURNAL, (pathname) => locations.push(pathname))
    })
    act(() => {
      result.current.onSettingsClick()
    })
    expect(locations).toEqual(['/', ROUTES.SETTINGS])
  })

  it('marks the settings button as active only on the settings route', () => {
    const { result } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(ROUTES.JOURNAL)
    })
    expect(result.current.isSettingsActive).toBe(false)

    const { result: settingsResult } = renderHook(() => useSidebar(), {
      wrapper: makeWrapper(ROUTES.SETTINGS)
    })
    expect(settingsResult.current.isSettingsActive).toBe(true)
  })
})
