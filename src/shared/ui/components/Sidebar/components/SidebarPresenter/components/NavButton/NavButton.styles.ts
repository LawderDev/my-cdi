import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const NAV_BTN_WIDTH_PX = 52
const NAV_BTN_HEIGHT_PX = 48
const ACTIVE_BAR_WIDTH_PX = 3
const ACTIVE_BAR_HEIGHT_PX = 20
const ACTIVE_BAR_LEFT_PX = -8
const ACTIVE_BAR_BORDER_RADIUS = '0 3px 3px 0'
const TRANSITION = 'all 0.2s'

export const ICON_FONT_SIZE_PX = 22

export const NavButtonRoot = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $active: boolean }>(({ $active }) => ({
  position: 'relative',
  width: `${NAV_BTN_WIDTH_PX}px`,
  height: `${NAV_BTN_HEIGHT_PX}px`,
  borderRadius: 'var(--radius-sm)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  transition: TRANSITION,
  backgroundColor: $active ? 'var(--accent-bg)' : 'transparent',
  color: $active ? 'var(--accent)' : 'var(--text-dim)',
  '&:hover': {
    backgroundColor: $active ? 'var(--accent-bg)' : 'var(--card)',
    color: $active ? 'var(--accent)' : 'var(--text)'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: `${ACTIVE_BAR_LEFT_PX}px`,
    top: '50%',
    transform: 'translateY(-50%)',
    width: `${ACTIVE_BAR_WIDTH_PX}px`,
    height: `${ACTIVE_BAR_HEIGHT_PX}px`,
    backgroundColor: 'var(--accent)',
    borderRadius: ACTIVE_BAR_BORDER_RADIUS,
    display: $active ? 'block' : 'none'
  }
}))
