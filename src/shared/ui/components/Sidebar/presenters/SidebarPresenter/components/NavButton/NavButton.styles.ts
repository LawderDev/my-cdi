import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { TINT_ALPHAS, TYPE_SCALE } from '@ui/theme'

const NAV_BTN_WIDTH_PX = 52
const NAV_BTN_HEIGHT_PX = 48

export const ICON_FONT_SIZE_PX = TYPE_SCALE.h5

export const NavButtonRoot = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $active: boolean }>(({ theme, $active }) => ({
  position: 'relative',
  width: `${NAV_BTN_WIDTH_PX}px`,
  height: `${NAV_BTN_HEIGHT_PX}px`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: $active ? alpha(theme.palette.primary.main, TINT_ALPHAS.surface) : 'transparent',
  color: $active ? theme.palette.primary.main : theme.palette.text.disabled,
  '&:hover': {
    backgroundColor: $active
      ? alpha(theme.palette.primary.main, TINT_ALPHAS.surface)
      : theme.palette.background.paper,
    color: $active ? theme.palette.primary.main : theme.palette.text.secondary
  }
}))
