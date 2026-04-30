import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useJournalDate } from './hooks/useJournalDate'
import { formatJournalDate } from './helpers/journalDate'
import { DatePickerView } from './components/DatePickerView'
import { DayNavButtonsView } from './components/DayNavButtonsView'

interface JournalDateNavigatorProps {
  selectedDate: string
  onSelectedDateChange: (isoDate: string) => void
}

const CONTAINER_GAP = 2
const CONTAINER_BOTTOM_MARGIN = 2

const containerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: CONTAINER_GAP,
  mb: CONTAINER_BOTTOM_MARGIN
}

export function JournalDateNavigator({
  selectedDate,
  onSelectedDateChange
}: JournalDateNavigatorProps) {
  const { goToPreviousDay, goToNextDay, goToToday } = useJournalDate({
    selectedDate,
    onSelectedDateChange
  })
  const label = formatJournalDate(selectedDate)

  return (
    <Box sx={containerStyles}>
      <DatePickerView selectedDate={selectedDate} label={label} onChange={onSelectedDateChange} />
      <DayNavButtonsView onPrevious={goToPreviousDay} onNext={goToNextDay} onToday={goToToday} />
    </Box>
  )
}
