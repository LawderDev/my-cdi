import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS } from '@ui/theme'

export const TableRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[1],
  '& table': {
    width: '100%',
    borderCollapse: 'collapse'
  },
  '& th': {
    textAlign: 'left',
    padding: theme.spacing(1.5, 2),
    fontSize: theme.typography.overline.fontSize,
    fontWeight: FONT_WEIGHTS.semibold,
    color: theme.palette.text.disabled,
    textTransform: 'uppercase',
    letterSpacing: theme.typography.overline.letterSpacing,
    backgroundColor: theme.palette.surface,
    borderBottom: `1px solid ${theme.palette.divider}`,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.secondary
    }
  },
  '& td': {
    padding: theme.spacing(1.5, 2),
    fontSize: theme.typography.body1.fontSize,
    borderBottom: `1px solid ${theme.palette.divider}`,
    verticalAlign: 'middle'
  },
  '& tr:last-child td': {
    borderBottom: 'none'
  },
  '& tbody tr': {
    transition: theme.transitions.create('background-color')
  },
  '& tbody tr:hover': {
    backgroundColor: theme.palette.surface,
    color: theme.palette.text.secondary
  }
}))

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
  borderTop: `1px solid ${theme.palette.divider}`,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.disabled
}))
