import { Card } from '@ui/components/Card'
import { IconButton } from '@ui/components/IconButton'
import type { CalendarViewPresenterProps } from './types/CalendarViewPresenterProps'
import { CalendarHeader, MonthGrid, MonthTitle, NavGroup } from './CalendarViewPresenter.styles'

export function CalendarViewPresenter({
  monthLabel,
  weekdayNodes,
  dayNodes,
  onPrev,
  onToday,
  onNext,
  prevLabel,
  todayLabel,
  nextLabel
}: CalendarViewPresenterProps) {
  return (
    <Card>
      <CalendarHeader>
        <MonthTitle variant="subtitle1">{monthLabel}</MonthTitle>
        <NavGroup>
          <IconButton iconName="chevron_left" aria-label={prevLabel} onClick={onPrev} />
          <IconButton iconName="today" aria-label={todayLabel} onClick={onToday} />
          <IconButton iconName="chevron_right" aria-label={nextLabel} onClick={onNext} />
        </NavGroup>
      </CalendarHeader>
      <MonthGrid>
        {weekdayNodes}
        {dayNodes}
      </MonthGrid>
    </Card>
  )
}
