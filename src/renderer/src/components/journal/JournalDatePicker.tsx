import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Dayjs } from 'dayjs'
import { datePickerStyles } from '../../styles/JournalPage.styles'

interface JournalDatePickerProps {
  value: Dayjs
  onChange: (newValue: Dayjs | null) => void
}

export const JournalDatePicker: React.FC<JournalDatePickerProps> = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        value={value}
        slots={{ actionBar: () => null }}
        onChange={onChange}
        sx={datePickerStyles}
      />
    </LocalizationProvider>
  )
}
