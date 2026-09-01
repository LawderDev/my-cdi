import Box from '@mui/material/Box'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const OPTION_GAP_SPACING = 1.25
const BADGE_PY_SPACING = 0.25

export const OptionRoot = styled('li', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: OPTION_GAP_SPACING
})

export const OptionBadge = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  ml: 'auto',
  fontSize: '11px',
  color: 'var(--text-dim)',
  backgroundColor: 'var(--surface)',
  px: 1,
  py: BADGE_PY_SPACING,
  borderRadius: 'var(--radius-xs)'
})
