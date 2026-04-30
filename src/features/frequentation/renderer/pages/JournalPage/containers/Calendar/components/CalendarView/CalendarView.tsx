import Box from '@mui/material/Box'
import { Card } from '@ui/components/Card'
import { IconButton } from '@ui/components/IconButton'
import type { CalendarCell } from '../../helpers/buildCalendarMonth'
import type { CalendarViewProps } from './types/CalendarViewProps'

const TITLE_FONT_SIZE_PX = 15
const TITLE_FONT_WEIGHT = 600
const DOW_FONT_SIZE_PX = 11
const DOW_FONT_WEIGHT = 600
const DAY_FONT_SIZE_PX = 13
const DAY_TODAY_FONT_WEIGHT = 600
const DAY_SIZE_PX = 36
const OTHER_MONTH_OPACITY = 0.4
const TODAY_SHADOW = '0 2px 8px rgba(124,77,255,0.35)'
const DAY_TRANSITION = 'all 0.15s'

const WEEK_DAYS_COUNT = 7
const VISITS_DOT_SIZE_PX = 4
const VISITS_DOT_BOTTOM_PX = -8

interface CalendarDayProps {
  cell: CalendarCell
  onSelect: (iso: string) => void
}

function CalendarDay({ cell, onSelect }: CalendarDayProps) {
  return (
    <Box
      component="button"
      type="button"
      data-iso={cell.iso}
      data-current-month={cell.isCurrentMonth}
      data-today={cell.isToday}
      data-selected={cell.isSelected}
      data-has-visits={cell.hasVisits}
      onClick={() => onSelect(cell.iso)}
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

export function CalendarView({
  monthLabel,
  cells,
  weekdayLabels,
  onPrev,
  onToday,
  onNext,
  onSelectDay,
  prevLabel,
  todayLabel,
  nextLabel
}: CalendarViewProps) {
  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ fontSize: `${TITLE_FONT_SIZE_PX}px`, fontWeight: TITLE_FONT_WEIGHT }}>
          {monthLabel}
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton iconName="chevron_left" aria-label={prevLabel} onClick={onPrev} />
          <IconButton iconName="today" aria-label={todayLabel} onClick={onToday} />
          <IconButton iconName="chevron_right" aria-label={nextLabel} onClick={onNext} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${WEEK_DAYS_COUNT}, 1fr)`,
          gap: 0.25,
          textAlign: 'center'
        }}
      >
        {weekdayLabels.map((label) => (
          <Box
            key={label}
            sx={{
              fontSize: `${DOW_FONT_SIZE_PX}px`,
              fontWeight: DOW_FONT_WEIGHT,
              color: 'var(--text-dim)',
              py: 0.75,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {label}
          </Box>
        ))}
        {cells.map((cell) => (
          <CalendarDay key={cell.iso} cell={cell} onSelect={onSelectDay} />
        ))}
      </Box>
    </Card>
  )
}
