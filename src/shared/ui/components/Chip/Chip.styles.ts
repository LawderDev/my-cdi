import MuiChip from '@mui/material/Chip'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, TINT_ALPHAS } from '@ui/theme'

const CHIP_HEIGHT_PX = 28
const CHIP_BORDER_ALPHA = TINT_ALPHAS.border

export const ChipRoot = styled(MuiChip, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  height: `${CHIP_HEIGHT_PX}px`,
  borderRadius: CHIP_HEIGHT_PX / 2,
  fontWeight: FONT_WEIGHTS.medium,
  fontSize: theme.typography.body2.fontSize,
  '&[data-tone="accent"]': {
    backgroundColor: alpha(theme.palette.primary.main, TINT_ALPHAS.surface),
    border: `1px solid ${alpha(theme.palette.primary.main, CHIP_BORDER_ALPHA)}`,
    color: theme.palette.primary.main
  },
  '&[data-tone="neutral"]': {
    backgroundColor: theme.palette.surface,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary
  }
}))
