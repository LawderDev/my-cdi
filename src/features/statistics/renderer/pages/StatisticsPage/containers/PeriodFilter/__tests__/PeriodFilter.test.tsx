import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PeriodFilter } from '../PeriodFilter'
import '@shared/i18n/config'

describe('PeriodFilter', () => {
  it('renders all six period buttons', () => {
    render(<PeriodFilter value="month" onChange={vi.fn()} />)
    expect(screen.getByText('Cette semaine')).toBeInTheDocument()
    expect(screen.getByText('Ce mois')).toBeInTheDocument()
    expect(screen.getByText('Ce trimestre')).toBeInTheDocument()
    expect(screen.getByText('Ce semestre')).toBeInTheDocument()
    expect(screen.getByText('Cette année')).toBeInTheDocument()
    expect(screen.getByText('Personnalisé')).toBeInTheDocument()
  })

  it('marks the selected button with the active style', () => {
    render(<PeriodFilter value="quarter" onChange={vi.fn()} />)
    const button = screen.getByText('Ce trimestre').closest('button')
    expect(button?.className).toContain('text-accent')
  })

  it('calls onChange with the new key when a button is clicked', () => {
    const onChange = vi.fn()
    render(<PeriodFilter value="month" onChange={onChange} />)
    fireEvent.click(screen.getByText('Cette semaine'))
    expect(onChange).toHaveBeenCalledWith('week')
  })

  it('disables the custom range button and does not fire onChange', () => {
    const onChange = vi.fn()
    render(<PeriodFilter value="month" onChange={onChange} />)
    const customButton = screen.getByText('Personnalisé').closest('button')
    expect(customButton).toBeDisabled()
    if (customButton) {
      fireEvent.click(customButton)
    }
    expect(onChange).not.toHaveBeenCalled()
  })
})
