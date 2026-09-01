import type { ChipProps } from './types/ChipProps'
import { ChipRoot } from './Chip.styles'

export function Chip({ label, onRemove, tone = 'accent', className }: ChipProps) {
  return <ChipRoot className={className} label={label} onDelete={onRemove} data-tone={tone} />
}
