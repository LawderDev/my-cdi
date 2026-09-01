import type { Dayjs } from 'dayjs'
import { Icon } from '@ui/components/Icon'
import { theme } from '@ui/theme'

import {
  HiddenTimePicker,
  PeriodBadge,
  TimeButton,
  TimeDisplay,
  TimeRow,
  TIME_ICON_FONT_SIZE_PX
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
        <Icon
          name="schedule"
          style={{ fontSize: TIME_ICON_FONT_SIZE_PX, color: theme.palette.text.disabled }}
        />
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
