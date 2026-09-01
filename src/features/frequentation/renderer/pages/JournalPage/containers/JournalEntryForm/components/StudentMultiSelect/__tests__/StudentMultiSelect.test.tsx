import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@shared/i18n/config'
import { StudentMultiSelect } from '../StudentMultiSelect'

const FIRST_ID = 1
const SECOND_ID = 2

const STUDENTS = [
  { id: FIRST_ID, displayName: 'Jean Dupont', classe: '3A' },
  { id: SECOND_ID, displayName: 'Marie Martin', classe: '3B' }
]

function renderWithProvider(props: Partial<Parameters<typeof StudentMultiSelect>[0]> = {}) {
  const merged: Parameters<typeof StudentMultiSelect>[0] = {
    students: STUDENTS,
    selectedIds: [],
    chips: [],
    inputValue: '',
    onInputChange: vi.fn(),
    onSelect: vi.fn(),
    loading: false,
    ...props
  }
  return {
    ...merged,
    ...render(
      <I18nextProvider i18n={i18n}>
        <StudentMultiSelect {...merged} />
      </I18nextProvider>
    )
  }
}

describe('StudentMultiSelect', () => {
  it('renders the autocomplete combobox', () => {
    renderWithProvider()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('typing filters and selecting a student calls onSelect with the option', () => {
    const onSelect = vi.fn()
    renderWithProvider({ onSelect })
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'Jean' } })
    const option = screen.getByRole('option', { name: /Jean Dupont/ })
    fireEvent.click(option)
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: FIRST_ID }))
  })

  it('renders one chip per selected student and clicking the × calls its onRemove', () => {
    const removeFirst = vi.fn()
    const removeSecond = vi.fn()
    renderWithProvider({
      chips: [
        { id: FIRST_ID, label: 'Jean Dupont', onRemove: removeFirst },
        { id: SECOND_ID, label: 'Marie Martin', onRemove: removeSecond }
      ]
    })
    expect(screen.getByText('Jean Dupont')).toBeInTheDocument()
    expect(screen.getByText('Marie Martin')).toBeInTheDocument()
    const removeButtons = document.querySelectorAll('.MuiChip-deleteIcon')
    if (removeButtons.length === 0) {
      throw new Error('Expected at least one remove button')
    }
    const [firstRemove] = removeButtons
    if (!firstRemove) {
      throw new Error('Expected at least one remove button')
    }
    fireEvent.click(firstRemove)
    expect(removeFirst).toHaveBeenCalledTimes(1)
    expect(removeSecond).not.toHaveBeenCalled()
  })
})
