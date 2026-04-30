import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon } from '../Icon'
import type { EmptyStateProps } from './types/EmptyStateProps'

const ICON_FONT_SIZE_PX = 48
const ICON_OPACITY = 0.4
const PY_SPACING = 7.5
const PX_SPACING = 2.5
const MESSAGE_MB_SPACING = 0.5
const DESCRIPTION_OPACITY = 0.7

export function EmptyState({ iconName, message, description, className }: EmptyStateProps) {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'var(--text-dim)',
        py: PY_SPACING,
        px: PX_SPACING
      }}
    >
      <Icon
        name={iconName}
        style={{
          fontSize: `${ICON_FONT_SIZE_PX}px`,
          marginBottom: '12px',
          opacity: ICON_OPACITY
        }}
      />
      <Typography sx={{ fontSize: '14px', mb: MESSAGE_MB_SPACING }}>{message}</Typography>
      {description ? (
        <Typography sx={{ fontSize: '12px', opacity: DESCRIPTION_OPACITY }}>
          {description}
        </Typography>
      ) : null}
    </Box>
  )
}
