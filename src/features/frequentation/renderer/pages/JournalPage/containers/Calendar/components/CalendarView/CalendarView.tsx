import Box from '@mui/material/Box'
import { Card } from '@ui/components/Card'
import { IconButton } from '@ui/components/IconButton'
import type { CalendarViewProps } from './types/CalendarViewProps'
import { TITLE_FONT_SIZE_PX, TITLE_FONT_WEIGHT, WEEK_DAYS_COUNT } from './CalendarView.styles'

export function CalendarView({
  monthLabel,
  weekdayNodes,
  dayNodes,
  onPrev,
  onToday,
  onNext,
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
        {weekdayNodes}
        {dayNodes}
      </Box>
    </Card>
  )
}
