import Paper from '@mui/material/Paper'
import type { CardPadding, CardProps } from './types/CardProps'

const PADDING_NONE_PX = 0
const PADDING_COMPACT_PX = 16
const PADDING_DEFAULT_PX = 20

const PADDING_PX: Record<CardPadding, number> = {
  none: PADDING_NONE_PX,
  compact: PADDING_COMPACT_PX,
  default: PADDING_DEFAULT_PX
}

const SHADOW = 'var(--shadow)'

export function Card({ padding = 'default', className, children, sx, ...rest }: CardProps) {
  return (
    <Paper
      {...rest}
      className={className}
      elevation={0}
      sx={[
        {
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: `${PADDING_PX[padding]}px`,
          boxShadow: SHADOW
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      {children}
    </Paper>
  )
}
