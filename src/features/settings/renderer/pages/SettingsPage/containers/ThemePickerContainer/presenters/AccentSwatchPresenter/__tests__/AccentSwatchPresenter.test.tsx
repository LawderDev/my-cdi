import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@mui/material/styles'
import { AccentSwatchPresenter } from '../AccentSwatchPresenter'
import { theme } from '@ui/theme'

function renderSwatch(props: Partial<Parameters<typeof AccentSwatchPresenter>[0]> = {}) {
  const onSelect = vi.fn()
  render(
    <ThemeProvider theme={theme}>
      <AccentSwatchPresenter
        label="Violet"
        swatch="#7c4dff"
        isActive={false}
        onSelect={onSelect}
        {...props}
      />
    </ThemeProvider>
  )
  return { onSelect }
}

describe('AccentSwatchPresenter', () => {
  it('renders an accessible swatch button labelled with the accent name', () => {
    renderSwatch()

    const button = screen.getByRole('button', { name: 'Violet' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-active', 'false')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })

  it('marks the active swatch', () => {
    renderSwatch({ isActive: true })

    expect(screen.getByRole('button', { name: 'Violet' })).toHaveAttribute('data-active', 'true')
  })

  it('invokes onSelect when clicked', async () => {
    const { onSelect } = renderSwatch()

    await userEvent.click(screen.getByRole('button', { name: 'Violet' }))

    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
