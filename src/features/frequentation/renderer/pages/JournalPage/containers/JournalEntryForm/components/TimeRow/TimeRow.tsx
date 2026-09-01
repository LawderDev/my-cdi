import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import type { Dayjs } from 'dayjs'
import { Icon } from '@ui/components/Icon'
import { MONO_FONT_FAMILY } from '@ui/theme'

import {
  TIME_ICON_FONT_SIZE_PX,
  TIME_DISPLAY_FONT_SIZE_PX,
  TIME_DISPLAY_FONT_WEIGHT,
  TIME_PERIOD_FONT_SIZE_PX,
  TIME_PERIOD_FONT_WEIGHT
} from './TimeRow.styles'

interface TimeRowProps {
  value: string
  dateValue: Dayjs
  periodLabel: string
  onCommit: (next: Dayjs | null) => void
  ariaLabel: string
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export function TimeRow({
  value,
  dateValue,
  periodLabel,
  onCommit,
  ariaLabel,
  open,
  onOpen,
  onClose
}: TimeRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <ButtonBase
        onClick={onOpen}
        aria-label={ariaLabel}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          borderRadius: 'var(--radius-xs)',
          px: 0.5,
          py: 0.25,
          transition: 'background 0.15s',
          '&:hover': { bgcolor: 'var(--surface)' },
          '&:focus-visible': { outline: '2px solid var(--accent-border)', outlineOffset: '2px' }
        }}
      >
        <Icon
          name="schedule"
          style={{ fontSize: `${TIME_ICON_FONT_SIZE_PX}px`, color: 'var(--text-dim)' }}
        />
        <Box
          component="span"
          sx={{
            fontFamily: MONO_FONT_FAMILY,
            fontSize: `${TIME_DISPLAY_FONT_SIZE_PX}px`,
            fontWeight: TIME_DISPLAY_FONT_WEIGHT,
            color: 'var(--accent)',
            letterSpacing: '1px'
          }}
        >
          {value}
        </Box>
      </ButtonBase>
      <Box
        component="span"
        sx={{
          fontSize: `${TIME_PERIOD_FONT_SIZE_PX}px`,
          color: 'var(--text-dim)',
          fontWeight: TIME_PERIOD_FONT_WEIGHT,
          px: 1,
          py: 0.25,
          bgcolor: 'var(--surface)',
          borderRadius: 'var(--radius-xs)'
        }}
      >
        {periodLabel}
      </Box>
      <MobileTimePicker
        open={open}
        value={dateValue}
        onChange={onCommit}
        onAccept={onCommit}
        onClose={onClose}
        ampm={false}
        slotProps={{
          textField: { sx: { display: 'none' } },
          dialog: { 'aria-label': ariaLabel }
        }}
      />
    </Box>
  )
}
