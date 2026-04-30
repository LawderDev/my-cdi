import { Box, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

interface DatePickerViewProps {
  selectedDate: string
  label: string
  onChange: (isoDate: string) => void
}

const DATE_INPUT_ARIA_LABEL = 'Date'
const CONTAINER_GAP = 2

const containerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: CONTAINER_GAP
}

export function DatePickerView({ selectedDate, label, onChange }: DatePickerViewProps) {
  return (
    <Box sx={containerStyles}>
      <TextField
        type="date"
        value={selectedDate}
        onChange={(event) => onChange(event.target.value)}
        inputProps={{ 'aria-label': DATE_INPUT_ARIA_LABEL }}
      />
      <Typography variant="h6">{label}</Typography>
    </Box>
  )
}
