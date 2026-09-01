import Paper from '@mui/material/Paper'
import type { CardProps } from './types/CardProps'
import { BASE_SX, PADDING_PX, SHADOW } from './Card.styles'

export function Card({ padding = 'default', className, children, sx, ...rest }: CardProps) {
  return (
    <Paper
      {...rest}
      className={className}
      elevation={0}
      sx={[
        { ...BASE_SX, padding: `${PADDING_PX[padding]}px`, boxShadow: SHADOW },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      {children}
    </Paper>
  )
}
