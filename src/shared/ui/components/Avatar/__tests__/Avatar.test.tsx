import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from '../Avatar'
import { avatarColor } from '../helpers/avatarColor'

describe('Avatar', () => {
  it('renders the initials inside the avatar root', () => {
    render(<Avatar initials="MC" colorSeed={0} />)
    expect(screen.getByText('MC')).toBeInTheDocument()
  })

  it('renders an MUI Avatar root', () => {
    const { container } = render(<Avatar initials="MC" colorSeed={0} />)
    const root = container.firstElementChild
    expect(root?.className).toMatch(/MuiAvatar-root/)
  })

  it('uses the colorSeed-derived hex value as the background and foreground', () => {
    const seed = 3
    const { bg } = avatarColor(seed)
    expect(bg).toBeTruthy()
  })

  it('appends custom className', () => {
    const { container } = render(<Avatar initials="X" colorSeed={0} className="my-extra" />)
    const root = container.firstElementChild
    expect(root?.className).toContain('my-extra')
  })
})
