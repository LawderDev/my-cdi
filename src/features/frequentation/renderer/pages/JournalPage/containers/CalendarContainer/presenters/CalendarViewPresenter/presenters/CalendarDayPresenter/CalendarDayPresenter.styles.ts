import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS } from '@ui/theme'

const DAY_SIZE_PX = 36
const VISITS_DOT_SIZE_PX = 4
const VISITS_DOT_BOTTOM_PX = 3
const OTHER_MONTH_OPACITY = 0.4

export const DayCell = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  position: 'relative',
  width: `${DAY_SIZE_PX}px`,
  height: `${DAY_SIZE_PX}px`,
  borderRadius: '50%',
  marginInline: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: theme.typography.body1.fontSize,
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color', 'box-shadow']),
  border: 'none',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  outline: 'none',
  '&:hover': {
    backgroundColor: theme.palette.surface
  },
  '&[data-today="true"]': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    fontWeight: FONT_WEIGHTS.semibold,
    boxShadow: theme.shadows[3],
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  '&[data-selected="true"]': {
    outline: `2px solid ${theme.palette.primary.main}`,
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
    backgroundColor: theme.palette.primary.main
  },
  '&[data-today="true"][data-has-visits="true"]::after': {
    backgroundColor: theme.palette.getContrastText(theme.palette.primary.main)
  }
}))
