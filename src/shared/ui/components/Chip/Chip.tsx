import MuiChip from '@mui/material/Chip'
import type { ChipProps } from './types/ChipProps'
import { buildChipSx } from './Chip.styles'

export function Chip({ label, onRemove, tone = 'accent', className }: ChipProps) {
  return (
    <MuiChip
      className={className}
      label={label}
      onDelete={onRemove}
      data-tone={tone}
      sx={buildChipSx(tone)}
    />
  )
}
