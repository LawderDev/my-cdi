import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const FONT_SIZE_PX = 11
export const FONT_WEIGHT = 500
export const DOT_SIZE_PX = 6

export const ChipRoot = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(0.25),
  borderRadius: 'var(--radius-xs)',
  fontSize: `${FONT_SIZE_PX}px`,
  fontWeight: FONT_WEIGHT
}))

export const ChipDot = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  width: `${DOT_SIZE_PX}px`,
  height: `${DOT_SIZE_PX}px`,
  borderRadius: '50%',
  display: 'inline-block'
})
