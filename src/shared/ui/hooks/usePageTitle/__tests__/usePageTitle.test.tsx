import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from '@shared/i18n/config'
import { ROUTES } from '@lib/routes'
import { usePageTitle } from '../usePageTitle'

function makeWrapper(initialPath: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
      </I18nextProvider>
    )
  }
}

describe('usePageTitle', () => {
  beforeEach(() => {
    document.title = ''
  })

  it('sets document.title to the journal title on journal route', () => {
    renderHook(() => usePageTitle(), { wrapper: makeWrapper(ROUTES.JOURNAL) })
    expect(document.title).toBe('Journal — Mon CDI')
  })

  it('sets document.title to the students title on students route', () => {
    renderHook(() => usePageTitle(), { wrapper: makeWrapper(ROUTES.STUDENTS) })
    expect(document.title).toBe('Élèves — Mon CDI')
  })

  it('sets document.title to the statistics title on statistics route', () => {
    renderHook(() => usePageTitle(), { wrapper: makeWrapper(ROUTES.STATISTICS) })
    expect(document.title).toBe('Statistiques — Mon CDI')
  })
})
