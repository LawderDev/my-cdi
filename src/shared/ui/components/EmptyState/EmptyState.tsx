import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon } from '../Icon'
import type { EmptyStateProps } from './types/EmptyStateProps'
import { CONTAINER_SX, DESCRIPTION_SX, ICON_STYLE, MESSAGE_SX } from './EmptyState.styles'

export function EmptyState({ iconName, message, description, className }: EmptyStateProps) {
  return (
    <Box className={className} sx={CONTAINER_SX}>
      <Icon name={iconName} style={ICON_STYLE} />
      <Typography sx={MESSAGE_SX}>{message}</Typography>
      {description ? <Typography sx={DESCRIPTION_SX}>{description}</Typography> : null}
    </Box>
  )
}
