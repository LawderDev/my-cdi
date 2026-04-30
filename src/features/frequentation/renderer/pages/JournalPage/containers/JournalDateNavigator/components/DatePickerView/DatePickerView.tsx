import { Box, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface DatePickerViewProps {
  selectedDate: string
  label: string
  onChange: (isoDate: string) => void
}

const CONTAINER_GAP = 2

const containerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: CONTAINER_GAP
}

export function DatePickerView({ selectedDate, label, onChange }: DatePickerViewProps) {
  const { t } = useTranslation('frequentation')
  return (
    <Box sx={containerStyles}>
      <TextField
        type="date"
        value={selectedDate}
        onChange={(event) => onChange(event.target.value)}
        inputProps={{ 'aria-label': t('fields.date') }}
      />
      <Typography variant="h6">{label}</Typography>
    </Box>
  )
}
