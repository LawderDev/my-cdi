import { Card } from '@ui/components/Card'
import { IconButton } from '@ui/components/IconButton'
import type { CalendarCell } from '../../helpers/buildCalendarMonth'
import type { CalendarViewProps } from './types/CalendarViewProps'

const HEADER_CLASSES = 'flex items-center justify-between mb-4'
const TITLE_CLASSES = 'text-[15px] font-semibold'
const NAV_CLASSES = 'flex gap-1'
const GRID_CLASSES = 'grid grid-cols-7 gap-0.5 text-center'
const DOW_CLASSES = 'text-[11px] font-semibold text-text-dim py-1.5 uppercase tracking-wider'

const DAY_BASE_CLASSES =
  'cal-day w-9 h-9 rounded-full mx-auto flex items-center justify-center text-[13px] cursor-pointer transition-all duration-150 relative hover:bg-surface'

const DAY_TODAY_CLASSES =
  'today bg-accent text-white font-semibold shadow-[0_2px_8px_rgba(124,77,255,0.35)]'

const DAY_SELECTED_CLASSES = 'selected outline outline-2 outline-accent outline-offset-2'

const DAY_OTHER_MONTH_CLASSES = 'other-month text-text-dim opacity-40'

const DAY_HAS_VISITS_CLASSES = 'has-visits'

function buildDayClass(cell: CalendarCell): string {
  const parts = [DAY_BASE_CLASSES]
  if (cell.isToday) {
    parts.push(DAY_TODAY_CLASSES)
  }
  if (cell.isSelected) {
    parts.push(DAY_SELECTED_CLASSES)
  }
  if (!cell.isCurrentMonth) {
    parts.push(DAY_OTHER_MONTH_CLASSES)
  }
  if (cell.hasVisits) {
    parts.push(DAY_HAS_VISITS_CLASSES)
  }
  return parts.join(' ')
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
  function renderCell(cell: CalendarCell) {
    return (
      <button
        type="button"
        key={cell.iso}
        className={buildDayClass(cell)}
        data-iso={cell.iso}
        data-current-month={cell.isCurrentMonth}
        onClick={() => onSelectDay(cell.iso)}
      >
        {cell.dayOfMonth}
      </button>
    )
  }

  return (
    <Card>
      <div className={HEADER_CLASSES}>
        <div className={TITLE_CLASSES}>{monthLabel}</div>
        <div className={NAV_CLASSES}>
          <IconButton iconName="chevron_left" aria-label={prevLabel} onClick={onPrev} />
          <IconButton iconName="today" aria-label={todayLabel} onClick={onToday} />
          <IconButton iconName="chevron_right" aria-label={nextLabel} onClick={onNext} />
        </div>
      </div>
      <div className={GRID_CLASSES}>
        {weekdayLabels.map((label) => (
          <div key={label} className={DOW_CLASSES}>
            {label}
          </div>
        ))}
        {cells.map(renderCell)}
      </div>
    </Card>
  )
}
