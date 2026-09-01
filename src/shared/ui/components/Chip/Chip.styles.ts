import MuiChip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const CHIP_HEIGHT_PX = 28
const CHIP_BORDER_RADIUS_PX = 14
const FONT_WEIGHT_MEDIUM = 500
const CHIP_FONT_SIZE_PX = 12

export const ChipRoot = styled(MuiChip, {
  shouldForwardProp: shouldForwardStyledProp
})({
  height: `${CHIP_HEIGHT_PX}px`,
  borderRadius: `${CHIP_BORDER_RADIUS_PX}px`,
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: `${CHIP_FONT_SIZE_PX}px`,
  '&[data-tone="accent"]': {
    backgroundColor: 'var(--accent-bg)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent)'
  },
  '&[data-tone="neutral"]': {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    color: 'var(--text)'
  }
})
