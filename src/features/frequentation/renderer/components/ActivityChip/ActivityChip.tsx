import { Chip } from '@mui/material'
import type { ActivityType } from '@types'

interface ActivityChipProps {
  activity: ActivityType
  label: string
  color: string
}

export function ActivityChip({ label, color }: ActivityChipProps) {
  return <Chip label={label} sx={{ backgroundColor: color, color: 'white' }} size="small" />
}
