import MuiChip from '@mui/material/Chip'
import type { ChipProps, ChipTone } from './types/ChipProps'

const TONE_SX: Record<ChipTone, Record<string, string | number>> = {
  accent: {
    backgroundColor: 'var(--accent-bg)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent)'
  },
  neutral: {
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    color: 'var(--text)'
  }
}

const CHIP_HEIGHT_PX = 28
const CHIP_BORDER_RADIUS_PX = 14
const FONT_WEIGHT_MEDIUM = 500
const CHIP_FONT_SIZE_PX = 12

export function Chip({ label, onRemove, tone = 'accent', className }: ChipProps) {
  return (
    <MuiChip
      className={className}
      label={label}
      onDelete={onRemove}
      data-tone={tone}
      sx={{
        height: `${CHIP_HEIGHT_PX}px`,
        borderRadius: `${CHIP_BORDER_RADIUS_PX}px`,
        fontWeight: FONT_WEIGHT_MEDIUM,
        fontSize: `${CHIP_FONT_SIZE_PX}px`,
        ...TONE_SX[tone]
      }}
    />
  )
}
