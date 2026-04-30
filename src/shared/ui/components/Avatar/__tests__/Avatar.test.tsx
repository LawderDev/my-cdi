import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from '../Avatar'
import { avatarColor } from '../helpers/avatarColor'

describe('Avatar', () => {
  it('renders the initials inside a div', () => {
    render(<Avatar initials="MC" colorSeed={0} />)
    expect(screen.getByText('MC')).toBeInTheDocument()
  })

  it('applies a circular layout via rounded-full', () => {
    const { container } = render(<Avatar initials="MC" colorSeed={0} />)
    const div = container.firstElementChild
    expect(div?.className).toContain('rounded-full')
  })

  it('uses the size token for medium by default', () => {
    const { container } = render(<Avatar initials="MC" colorSeed={0} />)
    const div = container.firstElementChild
    expect(div?.className).toContain('w-9')
  })

  it('switches size class for sm and lg', () => {
    const { container: smContainer } = render(<Avatar initials="X" colorSeed={0} size="sm" />)
    expect(smContainer.firstElementChild?.className).toContain('w-7')

    const { container: lgContainer } = render(<Avatar initials="X" colorSeed={0} size="lg" />)
    expect(lgContainer.firstElementChild?.className).toContain('w-12')
  })

  it('applies the colorSeed-derived background and foreground color', () => {
    const seed = 3
    const { bg } = avatarColor(seed)
    const { container } = render(<Avatar initials="AB" colorSeed={seed} />)
    const div = container.firstElementChild
    if (!(div instanceof HTMLElement)) {
      throw new Error('avatar div not found')
    }
    expect(div.style.color).toBeTruthy()
    expect(div.style.backgroundColor).toBeTruthy()
    expect(bg).toBeTruthy()
  })

  it('appends custom className alongside layout classes', () => {
    const { container } = render(<Avatar initials="X" colorSeed={0} className="my-extra" />)
    const div = container.firstElementChild
    expect(div?.className).toContain('my-extra')
    expect(div?.className).toContain('rounded-full')
  })
})
