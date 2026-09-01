import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const NO_SELECTION = 0
export const STRIP_FONT_SIZE_PX = 12
export const COUNT_FONT_WEIGHT = 500

export const BatchActionsStrip = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  paddingInline: theme.spacing(1.5),
  paddingBlock: theme.spacing(1),
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  fontSize: `${STRIP_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
}))

export const BatchCountLabel = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontWeight: COUNT_FONT_WEIGHT
})
