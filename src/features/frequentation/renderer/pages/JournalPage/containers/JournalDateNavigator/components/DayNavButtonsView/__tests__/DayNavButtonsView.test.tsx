import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import type { ReactNode } from 'react'
import i18n from '@shared/i18n/config'
import { DayNavButtonsView } from '../DayNavButtonsView'

function Wrapper({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

describe('DayNavButtonsView', () => {
  it('calls onPrevious / onNext / onToday', () => {
    const onPrevious = vi.fn()
    const onNext = vi.fn()
    const onToday = vi.fn()
    render(<DayNavButtonsView onPrevious={onPrevious} onNext={onNext} onToday={onToday} />, {
      wrapper: Wrapper
    })
    fireEvent.click(screen.getByRole('button', { name: /précédent/i }))
    fireEvent.click(screen.getByRole('button', { name: /aujourd'hui/i }))
    fireEvent.click(screen.getByRole('button', { name: /suivant/i }))
    expect(onPrevious).toHaveBeenCalled()
    expect(onToday).toHaveBeenCalled()
    expect(onNext).toHaveBeenCalled()
  })
})
