import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const MENU_MIN_WIDTH_PX = 180

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
})(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: `${MENU_MIN_WIDTH_PX}px`,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2]
  }
}))

export const CountText = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled
}))
