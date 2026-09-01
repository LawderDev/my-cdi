import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { RouteSuspenseFallback } from '../RouteSuspenseFallback'

describe('RouteSuspenseFallback', () => {
  it('renders a centered progress indicator', () => {
    const { container } = render(<RouteSuspenseFallback />)
    expect(container.querySelector('.MuiCircularProgress-root')).not.toBeNull()
  })
})
