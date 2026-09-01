import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const FOOTER_FONT_SIZE_PX = 12

export const TableRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  width: '100%',
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow)'
})

export const TableElement = styled('table', {
  shouldForwardProp: shouldForwardStyledProp
})({
  width: '100%',
  borderCollapse: 'collapse'
})

export const TableFooter = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1.5),
  borderTop: '1px solid var(--border)',
  fontSize: `${FOOTER_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
}))
