import Box from '@mui/material/Box'
import type { CalendarCell } from '../../../../helpers/buildCalendarMonth'
import {
  DAY_FONT_SIZE_PX,
  DAY_SIZE_PX,
  DAY_TODAY_FONT_WEIGHT,
  DAY_TRANSITION,
  OTHER_MONTH_OPACITY,
  TODAY_SHADOW,
  VISITS_DOT_BOTTOM_PX,
  VISITS_DOT_SIZE_PX
} from './CalendarDay.styles'

interface CalendarDayProps {
  cell: CalendarCell
  onClick: () => void
}

export function CalendarDay({ cell, onClick }: CalendarDayProps) {
  return (
    <Box
      component="button"
      type="button"
      data-iso={cell.iso}
      data-current-month={cell.isCurrentMonth}
      data-today={cell.isToday}
      data-selected={cell.isSelected}
      data-has-visits={cell.hasVisits}
      onClick={onClick}
      sx={{
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
        bgcolor: cell.isToday ? 'var(--accent)' : 'transparent',
        color: cell.isToday ? '#fff' : 'var(--title)',
        fontWeight: cell.isToday ? DAY_TODAY_FONT_WEIGHT : undefined,
        boxShadow: cell.isToday ? TODAY_SHADOW : undefined,
        outline: cell.isSelected ? '2px solid var(--accent)' : 'none',
        outlineOffset: cell.isSelected ? '2px' : undefined,
        opacity: !cell.isCurrentMonth ? OTHER_MONTH_OPACITY : 1,
        '&:hover': {
          bgcolor: cell.isToday ? 'var(--accent)' : 'var(--surface)'
        },
        ...(cell.hasVisits
          ? {
              '&::after': {
                content: '""',
                position: 'absolute',
                left: '50%',
                bottom: `${VISITS_DOT_BOTTOM_PX}px`,
                transform: 'translateX(-50%)',
                width: `${VISITS_DOT_SIZE_PX}px`,
                height: `${VISITS_DOT_SIZE_PX}px`,
                borderRadius: '50%',
                bgcolor: cell.isToday ? '#fff' : 'var(--accent)'
              }
            }
          : {})
      }}
    >
      {cell.dayOfMonth}
    </Box>
  )
}
