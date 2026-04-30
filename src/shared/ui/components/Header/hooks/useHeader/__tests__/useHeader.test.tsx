import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { ROUTES } from '@lib/routes'
import { useHeader } from '../useHeader'

const TIME_REGEX = /^\d{2}:\d{2}$/
const FIXED_DATE = new Date('2026-04-30T08:30:00Z')

function makeWrapper(initialPath: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
      </I18nextProvider>
    )
  }
}

describe('useHeader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(FIXED_DATE)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the journal title/subtitle on the journal route', () => {
    const { result } = renderHook(() => useHeader(), { wrapper: makeWrapper(ROUTES.JOURNAL) })
    expect(result.current.title).toBe('Journal')
    expect(result.current.subtitle).toBe('Enregistrement des fréquentations du jour')
    expect(result.current.time).toMatch(TIME_REGEX)
  })

  it('returns the students title/subtitle on the students route', () => {
    const { result } = renderHook(() => useHeader(), { wrapper: makeWrapper(ROUTES.STUDENTS) })
    expect(result.current.title).toBe('Liste des élèves')
    expect(result.current.subtitle).toBe('Gestion de la base élèves')
  })

  it('returns the statistics title/subtitle on the statistics route', () => {
    const { result } = renderHook(() => useHeader(), { wrapper: makeWrapper(ROUTES.STATISTICS) })
    expect(result.current.title).toBe('Statistiques')
    expect(result.current.subtitle).toBe('Analyse des fréquentations du CDI')
  })
})
