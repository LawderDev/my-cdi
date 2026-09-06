import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { RADII, TINT_ALPHAS } from '@ui/theme'

const SWATCH_SIZE_PX = 40
const SWATCH_RING_GAP_PX = 3
const SWATCH_DOT_SIZE_PX = 14

export const AccentSwatchButton = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $swatchMain: string; $swatchBackground: string }>(
  ({ theme, $swatchMain, $swatchBackground }) => ({
    position: 'relative',
    width: `${SWATCH_SIZE_PX}px`,
    height: `${SWATCH_SIZE_PX}px`,
    boxSizing: 'border-box',
    borderRadius: RADII.base,
    border: '2px solid transparent',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: theme.transitions.create(['border-color', 'transform']),
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: `${SWATCH_RING_GAP_PX}px`,
      borderRadius: `calc(${RADII.base}px - ${SWATCH_RING_GAP_PX}px)`,
      backgroundColor: $swatchBackground,
      transition: theme.transitions.create(['box-shadow'])
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: `${SWATCH_DOT_SIZE_PX}px`,
      height: `${SWATCH_DOT_SIZE_PX}px`,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: $swatchMain,
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
  })
)
