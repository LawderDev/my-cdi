import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { CONTROL_HEIGHTS, FONT_WEIGHTS, RADII, TINT_ALPHAS } from '@ui/theme'

const OPTION_MIN_WIDTH_PX = 96

export const ModeOptionButton = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  minWidth: `${OPTION_MIN_WIDTH_PX}px`,
  height: `${CONTROL_HEIGHTS.sm}px`,
  paddingInline: theme.spacing(2),
  borderRadius: RADII.base,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: FONT_WEIGHTS.medium,
  border: '1px solid',
  borderColor: theme.palette.divider,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(['background-color', 'border-color', 'color']),
  '&[data-active="true"]': {
    fontWeight: FONT_WEIGHTS.semibold,
    borderColor: alpha(theme.palette.primary.main, TINT_ALPHAS.border),
    backgroundColor: alpha(theme.palette.primary.main, TINT_ALPHAS.surface),
    color: theme.palette.primary.main
  },
  '&:hover': {
    borderColor: theme.palette.dividerStrong,
    color: theme.palette.text.primary
  },
  '&[data-active="true"]:hover': {
    borderColor: alpha(theme.palette.primary.main, TINT_ALPHAS.border),
    color: theme.palette.primary.main
  },
  '&:focus-visible': {
    outline: `2px solid ${alpha(theme.palette.primary.main, TINT_ALPHAS.border)}`,
    outlineOffset: '2px'
  }
}))
