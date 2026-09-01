import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Box from '@mui/material/Box'
import { styled } from '../styled'
import { shouldForwardStyledProp } from '../../shouldForwardStyledProp'

const BACKGROUND = 'rgb(99, 98, 97)'
const HOVER_BACKGROUND = 'rgb(11, 12, 13)'

const SxBox = styled(Box, { shouldForwardProp: shouldForwardStyledProp })({
  px: 2,
  gap: 1,
  bgcolor: BACKGROUND,
  mt: 1.5,
  '&:hover': { bgcolor: HOVER_BACKGROUND, px: 3 }
})

const SizedBox = styled('div', { shouldForwardProp: shouldForwardStyledProp })<{ $size: number }>(
  ({ $size }) => ({ mt: $size, p: 2 })
)

function getEmotionCss(): string {
  return Array.from(document.querySelectorAll('style'))
    .map((styleTag) => styleTag.textContent)
    .join('\n')
}

describe('styled', () => {
  it('resolves MUI system props in the style object', () => {
    render(<SxBox data-testid="sx-box" />)
    const css = getEmotionCss()

    expect(css).toContain('padding-left:16px')
    expect(css).toContain('padding-right:16px')
    expect(css).toContain('gap:8px')
    expect(css).toContain(`background-color:${BACKGROUND}`)
    expect(css).toContain('margin-top:12px')
  })

  it('resolves system props inside nested selectors', () => {
    render(<SxBox data-testid="sx-box-hover" />)
    const css = getEmotionCss()

    expect(css).toContain(':hover{')
    expect(css).toMatch(/:hover\{[^}]*background-color:rgb\(11, 12, 13\)/)
  })

  it('resolves system props returned from style callbacks', () => {
    render(<SizedBox $size={3} data-testid="sized-box" />)
    const css = getEmotionCss()

    expect(css).toContain('margin-top:24px')
    expect(css).toContain('padding:16px')
  })

  it('keeps transient props out of the DOM', () => {
    const { getByTestId } = render(<SizedBox $size={1} data-testid="sized-dom-box" />)

    expect(getByTestId('sized-dom-box').getAttribute('$size')).toBeNull()
  })
})
