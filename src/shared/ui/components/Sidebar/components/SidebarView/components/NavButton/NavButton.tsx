import Box from '@mui/material/Box'
import { Icon } from '../../../../../Icon'
import type { NavButtonProps } from './types/NavButtonProps'
import {
  ACTIVE_BAR_BORDER_RADIUS,
  ACTIVE_BAR_HEIGHT_PX,
  ACTIVE_BAR_LEFT_PX,
  ACTIVE_BAR_WIDTH_PX,
  ICON_FONT_SIZE_PX,
  NAV_BTN_HEIGHT_PX,
  NAV_BTN_WIDTH_PX,
  TRANSITION
} from './NavButton.styles'

export function NavButton({ active, iconName, label, ariaCurrent, onClick }: NavButtonProps) {
  return (
    <Box
      component="button"
      type="button"
      title={label}
      aria-label={label}
      aria-current={ariaCurrent}
      onClick={onClick}
      sx={{
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
        bgcolor: active ? 'var(--accent-bg)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-dim)',
        '&:hover': {
          bgcolor: active ? 'var(--accent-bg)' : 'var(--card)',
          color: active ? 'var(--accent)' : 'var(--text)'
        },
        ...(active
          ? {
              '&::before': {
                content: '""',
                position: 'absolute',
                left: `${ACTIVE_BAR_LEFT_PX}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                width: `${ACTIVE_BAR_WIDTH_PX}px`,
                height: `${ACTIVE_BAR_HEIGHT_PX}px`,
                bgcolor: 'var(--accent)',
                borderRadius: ACTIVE_BAR_BORDER_RADIUS
              }
            }
          : {})
      }}
    >
      <Icon name={iconName} style={{ fontSize: `${ICON_FONT_SIZE_PX}px` }} />
    </Box>
  )
}
