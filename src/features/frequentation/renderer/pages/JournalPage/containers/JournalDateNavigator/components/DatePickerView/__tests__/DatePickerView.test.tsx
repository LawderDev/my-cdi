import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DatePickerView } from '../DatePickerView'

describe('DatePickerView', () => {
  it('renders the current selected date in label form', () => {
    render(
      <DatePickerView selectedDate="2026-04-01" label="lundi 1 avril 2026" onChange={vi.fn()} />
    )
    expect(screen.getByText('lundi 1 avril 2026')).toBeInTheDocument()
  })

  it('calls onChange when a new date is picked', () => {
    const onChange = vi.fn()
    render(
      <DatePickerView selectedDate="2026-04-01" label="lundi 1 avril 2026" onChange={onChange} />
    )
    const input = screen.getByLabelText(/date/i)
    fireEvent.change(input, { target: { value: '2026-04-02' } })
    expect(onChange).toHaveBeenCalledWith('2026-04-02')
  })
})
