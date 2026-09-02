import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { useTypeToSearch } from '../useTypeToSearch'

afterEach(cleanup)

function Harness() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useTypeToSearch(inputRef)
  return <input ref={inputRef} data-testid="search-input" />
}

function pressKey(key: string, overrides: Partial<KeyboardEventInit> = {}) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, ...overrides })
  window.dispatchEvent(event)
}

describe('useTypeToSearch', () => {
  it('focuses the input when a printable key is pressed with nothing focused', () => {
    render(<Harness />)
    const input = screen.getByTestId('search-input')
    expect(document.activeElement).toBe(document.body)

    pressKey('a')

    expect(document.activeElement).toBe(input)
  })

  it('does not focus when the target is an editable element', () => {
    render(<Harness />)
    const otherInput = document.createElement('input')
    document.body.appendChild(otherInput)
    otherInput.focus()

    pressKey('a')

    expect(document.activeElement).toBe(otherInput)
    otherInput.remove()
  })

  it('does not focus when another element already has focus', () => {
    render(<Harness />)
    const button = document.createElement('button')
    document.body.appendChild(button)
    button.focus()

    pressKey('a')

    expect(document.activeElement).toBe(button)
    button.remove()
  })

  it('does not focus on shortcut combinations', () => {
    render(<Harness />)
    pressKey('r', { ctrlKey: true })
    expect(document.activeElement).toBe(document.body)

    pressKey('Enter')
    expect(document.activeElement).toBe(document.body)
  })

  it('lets the keystroke land in the newly focused input', async () => {
    render(<Harness />)
    const input = screen.getByTestId('search-input')
    await userEvent.type(document.body, 'ab')
    expect(input).toHaveValue('ab')
  })
})
