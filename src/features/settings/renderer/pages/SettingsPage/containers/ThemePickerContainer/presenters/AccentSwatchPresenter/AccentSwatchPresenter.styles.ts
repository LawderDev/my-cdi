import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { RADII, TINT_ALPHAS } from '@ui/theme'

const SWATCH_SIZE_PX = 40
const SWATCH_RING_GAP_PX = 3

export const AccentSwatchButton = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $swatch: string }>(({ theme, $swatch }) => ({
  width: `${SWATCH_SIZE_PX}px`,
  height: `${SWATCH_SIZE_PX}px`,
  boxSizing: 'border-box',
  padding: `${SWATCH_RING_GAP_PX}px`,
  borderRadius: RADII.base,
  border: '2px solid transparent',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: theme.transitions.create(['border-color', 'transform']),
  '&::before': {
    content: '""',
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: `calc(${RADII.base}px - ${SWATCH_RING_GAP_PX}px)`,
    backgroundColor: $swatch,
    transition: theme.transitions.create(['box-shadow'])
  },
  '&:hover': {
    borderColor: theme.palette.dividerStrong
  },
  '&[data-active="true"]': {
    borderColor: alpha(theme.palette.primary.main, TINT_ALPHAS.border),
    '&::before': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, TINT_ALPHAS.border)}`
    }
  },
  '&:focus-visible': {
    outline: `2px solid ${alpha(theme.palette.primary.main, TINT_ALPHAS.border)}`,
    outlineOffset: '2px'
  }
}))
