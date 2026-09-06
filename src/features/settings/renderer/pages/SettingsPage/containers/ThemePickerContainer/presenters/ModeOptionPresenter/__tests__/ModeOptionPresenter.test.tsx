import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import { ModeOptionPresenter } from '../ModeOptionPresenter'
import { theme } from '@ui/theme'

function renderOption(props: Partial<Parameters<typeof ModeOptionPresenter>[0]> = {}) {
  const onSelect = vi.fn()
  render(
    <ThemeProvider theme={theme}>
      <ModeOptionPresenter label="Clair" isActive={false} onSelect={onSelect} {...props} />
    </ThemeProvider>
  )
  return { onSelect }
}

describe('ModeOptionPresenter', () => {
  it('renders the mode label as a toggle button', () => {
    renderOption()

    const button = screen.getByRole('button', { name: 'Clair' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-active', 'false')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('marks the active mode', () => {
    renderOption({ isActive: true })

    expect(screen.getByRole('button', { name: 'Clair' })).toHaveAttribute('data-active', 'true')
  })

  it('invokes onSelect when clicked', async () => {
    const { onSelect } = renderOption()

    await userEvent.click(screen.getByRole('button', { name: 'Clair' }))

    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
