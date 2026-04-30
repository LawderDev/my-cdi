import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Autocomplete } from '../Autocomplete'
import type { AutocompleteOption } from '../types/AutocompleteProps'

const STUDENT_ID_ALICE = 1
const STUDENT_ID_BOB = 2
const STUDENT_ID_CHARLIE = 3

const STUDENT_OPTIONS: AutocompleteOption<number>[] = [
  { value: STUDENT_ID_ALICE, label: 'Alice Martin', badge: '6e A' },
  { value: STUDENT_ID_BOB, label: 'Bob Dupont', badge: '5e B' },
  { value: STUDENT_ID_CHARLIE, label: 'Charlie Durand', badge: '4e C' }
]

describe('Autocomplete', () => {
  it('renders an input with the provided placeholder', () => {
    render(
      <Autocomplete
        placeholder="Rechercher un élève"
        options={STUDENT_OPTIONS}
        onSelect={vi.fn()}
      />
    )
    expect(screen.getByPlaceholderText('Rechercher un élève')).toBeInTheDocument()
  })

  it('opens the dropdown on focus and lists the options', async () => {
    render(<Autocomplete options={STUDENT_OPTIONS} onSelect={vi.fn()} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(STUDENT_OPTIONS.length)
  })

  it('filters options as the user types', async () => {
    render(<Autocomplete options={STUDENT_OPTIONS} onSelect={vi.fn()} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.type(input, 'alic')
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]?.textContent).toContain('Alice Martin')
  })

  it('renders the badge when provided', async () => {
    render(<Autocomplete options={STUDENT_OPTIONS} onSelect={vi.fn()} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    expect(screen.getByText('6e A')).toBeInTheDocument()
  })

  it('calls onSelect when an option is clicked', async () => {
    const onSelect = vi.fn()
    render(<Autocomplete options={STUDENT_OPTIONS} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    const aliceOption = screen.getByText('Alice Martin')
    await userEvent.click(aliceOption)
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(STUDENT_OPTIONS[0])
  })

  it('selects the highlighted option on Enter key', async () => {
    const onSelect = vi.fn()
    render(<Autocomplete options={STUDENT_OPTIONS} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.keyboard('{ArrowDown}{Enter}')
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(STUDENT_OPTIONS[0])
  })

  it('hides options listed in excludedValues', async () => {
    render(
      <Autocomplete
        options={STUDENT_OPTIONS}
        onSelect={vi.fn()}
        excludedValues={[STUDENT_ID_ALICE]}
      />
    )
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    const labels = screen.getAllByRole('option').map((o) => o.textContent ?? '')
    expect(labels.some((label) => label.includes('Alice'))).toBe(false)
    expect(labels.some((label) => label.includes('Bob'))).toBe(true)
  })
})
