import Box from '@mui/material/Box'
import { Card } from '@ui/components/Card'
import { IconButton } from '@ui/components/IconButton'
import type { CalendarViewProps } from './types/CalendarViewProps'
import { CalendarDay } from './components/CalendarDay'
import {
  DOW_FONT_SIZE_PX,
  DOW_FONT_WEIGHT,
  TITLE_FONT_SIZE_PX,
  TITLE_FONT_WEIGHT,
  WEEK_DAYS_COUNT
} from './CalendarView.styles'

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
              letterSpacing: '0.5px'
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
