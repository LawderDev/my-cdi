import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AppVersion } from '../AppVersion'

const APP_VERSION_STUB = '1.2.3'

describe('AppVersion', () => {
  it('renders the app version when provided', () => {
    render(<AppVersion version={APP_VERSION_STUB} />)
    expect(screen.getByText(`version ${APP_VERSION_STUB}`)).toBeInTheDocument()
  })

  it('renders nothing when version is empty', () => {
    const { container } = render(<AppVersion version="" />)
    expect(container.firstChild).toBeNull()
  })
})
