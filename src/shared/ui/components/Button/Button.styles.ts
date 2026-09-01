import MuiButton from '@mui/material/Button'
import { alpha, styled } from '@mui/material/styles'
import { FONT_WEIGHTS, TINT_ALPHAS } from '@ui/theme'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const PRIMARY_HEIGHT_PX = 40
const SECONDARY_HEIGHT_PX = 36
const DANGER_HEIGHT_PX = 36
const DISABLED_OPACITY = 0.5
const DANGER_BORDER_ALPHA = TINT_ALPHAS.border
const DANGER_HOVER_ALPHA = TINT_ALPHAS.hover

export const ButtonRoot = styled(MuiButton, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  height: `${PRIMARY_HEIGHT_PX}px`,
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.body1.fontSize,
  '&[data-variant="primary"]': {
    fontWeight: FONT_WEIGHTS.semibold,
    paddingInline: theme.spacing(2.5),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[3],
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      boxShadow: theme.shadows[4]
    },
    '&.Mui-disabled': {
      opacity: DISABLED_OPACITY,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    }
  },
  '&[data-variant="secondary"]': {
    height: `${SECONDARY_HEIGHT_PX}px`,
    fontWeight: FONT_WEIGHTS.medium,
    paddingInline: theme.spacing(2),
    backgroundColor: theme.palette.surface,
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.dividerStrong
    }
  },
  '&[data-variant="danger"]': {
    height: `${DANGER_HEIGHT_PX}px`,
    fontWeight: FONT_WEIGHTS.medium,
    paddingInline: theme.spacing(2),
    backgroundColor: alpha(theme.palette.error.main, TINT_ALPHAS.surface),
    color: theme.palette.error.main,
    border: `1px solid ${alpha(theme.palette.error.main, DANGER_BORDER_ALPHA)}`,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, DANGER_HOVER_ALPHA),
      boxShadow: 'none'
    }
  }
}))
