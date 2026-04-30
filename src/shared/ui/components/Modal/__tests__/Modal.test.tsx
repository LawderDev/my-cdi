import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../Modal'

describe('Modal', () => {
  it('renders nothing when open is false', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Hidden">
        <p>body</p>
      </Modal>
    )
    expect(screen.queryByText('Hidden')).toBeNull()
    expect(screen.queryByText('body')).toBeNull()
  })

  it('renders the title and body when open is true', () => {
    render(
      <Modal open={true} onClose={() => {}} title="My title">
        <p>body content</p>
      </Modal>
    )
    expect(screen.getByText('My title')).toBeInTheDocument()
    expect(screen.getByText('body content')).toBeInTheDocument()
  })

  it('renders the footer when provided', () => {
    render(
      <Modal open={true} onClose={() => {}} title="t" footer={<button type="button">Save</button>}>
        <p>body</p>
      </Modal>
    )
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })

  it('mounts to a portal at document.body', () => {
    const { container } = render(
      <Modal open={true} onClose={() => {}} title="t">
        <p>body</p>
      </Modal>
    )
    expect(container.querySelector('p')).toBeNull()
    expect(document.body.querySelector('p')?.textContent).toBe('body')
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="t">
        <p>body</p>
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the overlay backdrop is clicked', async () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="t">
        <p>body</p>
      </Modal>
    )
    const overlay = document.querySelector('[data-modal-overlay="true"]')
    if (!(overlay instanceof HTMLElement)) {
      throw new Error('overlay not found')
    }
    await userEvent.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when clicking inside the modal body', async () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="t">
        <p>body</p>
      </Modal>
    )
    await userEvent.click(screen.getByText('body'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders a close icon button that triggers onClose', async () => {
    const onClose = vi.fn()
    render(
      <Modal open={true} onClose={onClose} title="t">
        <p>body</p>
      </Modal>
    )
    const closeBtn = screen.getByRole('button', { name: /close|fermer/i })
    await userEvent.click(closeBtn)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
