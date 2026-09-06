import type { Dayjs } from 'dayjs'

import {
  HiddenTimePicker,
  PeriodBadge,
  TimeButton,
  TimeDisplay,
  TimeIcon,
  TimeRow
} from './TimeRowPresenter.styles'

interface TimeRowPresenterProps {
  value: string
  dateValue: Dayjs
  periodLabel: string
  onCommit: (next: Dayjs | null) => void
  ariaLabel: string
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export function TimeRowPresenter({
  value,
  dateValue,
  periodLabel,
  onCommit,
  ariaLabel,
  open,
  onOpen,
  onClose
}: TimeRowPresenterProps) {
  return (
    <TimeRow>
      <TimeButton onClick={onOpen} aria-label={ariaLabel}>
        <TimeIcon name="schedule" />
        <TimeDisplay>{value}</TimeDisplay>
      </TimeButton>
      <PeriodBadge variant="caption">{periodLabel}</PeriodBadge>
      <HiddenTimePicker
        open={open}
        value={dateValue}
        onChange={onCommit}
        onAccept={onCommit}
        onClose={onClose}
        ampm={false}
        slotProps={{
          dialog: { 'aria-label': ariaLabel }
        }}
      />
    </TimeRow>
  )
}
