import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const OPTION_GAP_SPACING = 1.25
const BADGE_PY_SPACING = 0.25

export const OptionRoot = styled('li', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(OPTION_GAP_SPACING)
}))

export const OptionBadge = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginLeft: 'auto',
  fontSize: '11px',
  color: 'var(--text-dim)',
  backgroundColor: 'var(--surface)',
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(BADGE_PY_SPACING),
  borderRadius: 'var(--radius-xs)'
}))
