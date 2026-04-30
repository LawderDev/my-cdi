import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JournalEntryToolbar } from '../JournalEntryToolbar'
import '@shared/i18n/config'

const ENTRY_COUNT = 3

describe('JournalEntryToolbar', () => {
  it('shows the count and triggers onAddClick', () => {
    const onAddClick = vi.fn()
    render(<JournalEntryToolbar entryCount={ENTRY_COUNT} onAddClick={onAddClick} />)
    expect(screen.getByText(/3/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /ajouter/i }))
    expect(onAddClick).toHaveBeenCalled()
  })
})
