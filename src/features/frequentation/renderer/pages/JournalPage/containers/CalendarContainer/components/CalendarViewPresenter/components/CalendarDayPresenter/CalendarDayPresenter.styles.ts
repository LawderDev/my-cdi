import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const DAY_FONT_SIZE_PX = 13
export const DAY_TODAY_FONT_WEIGHT = 600
export const DAY_SIZE_PX = 36
export const OTHER_MONTH_OPACITY = 0.4
export const TODAY_SHADOW = '0 2px 8px rgba(124,77,255,0.35)'
export const DAY_TRANSITION = 'all 0.15s'
export const VISITS_DOT_SIZE_PX = 4
export const VISITS_DOT_BOTTOM_PX = 3

export const DayCell = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})({
  position: 'relative',
  width: `${DAY_SIZE_PX}px`,
  height: `${DAY_SIZE_PX}px`,
  borderRadius: '50%',
  mx: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: `${DAY_FONT_SIZE_PX}px`,
  cursor: 'pointer',
  transition: DAY_TRANSITION,
  border: 'none',
  bgcolor: 'transparent',
  color: 'var(--title)',
  outline: 'none',
  '&:hover': {
    bgcolor: 'var(--surface)'
  },
  '&[data-today="true"]': {
    bgcolor: 'var(--accent)',
    color: '#fff',
    fontWeight: DAY_TODAY_FONT_WEIGHT,
    boxShadow: TODAY_SHADOW,
    '&:hover': {
      bgcolor: 'var(--accent)'
    }
  },
  '&[data-selected="true"]': {
    outline: '2px solid var(--accent)',
    outlineOffset: '2px'
  },
  '&:not([data-current-month="true"])': {
    opacity: OTHER_MONTH_OPACITY
  },
  '&[data-has-visits="true"]::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    bottom: `${VISITS_DOT_BOTTOM_PX}px`,
    transform: 'translateX(-50%)',
    width: `${VISITS_DOT_SIZE_PX}px`,
    height: `${VISITS_DOT_SIZE_PX}px`,
    borderRadius: '50%',
    bgcolor: 'var(--accent)'
  },
  '&[data-today="true"][data-has-visits="true"]::after': {
    bgcolor: '#fff'
  }
})
