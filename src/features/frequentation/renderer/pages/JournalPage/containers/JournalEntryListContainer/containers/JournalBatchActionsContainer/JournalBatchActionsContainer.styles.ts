import Menu from '@mui/material/Menu'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const COUNT_FONT_SIZE_PX = 12
export const COUNT_FONT_WEIGHT = 500
export const MENU_MIN_WIDTH_PX = 180

export const BatchActionsRoot = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  marginTop: theme.spacing(1),
  paddingInline: theme.spacing(1)
}))

export const MenuAnchor = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'inline-block'
})

export const ActivityMenu = styled(Menu, {
  shouldForwardProp: shouldForwardStyledProp
})({
  '& .MuiPaper-root': {
    minWidth: `${MENU_MIN_WIDTH_PX}px`,
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-lg)'
  }
})

export const CountText = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${COUNT_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  fontWeight: COUNT_FONT_WEIGHT
})
