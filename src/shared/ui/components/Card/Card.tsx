import type { CardProps } from './types/CardProps'
import { CardRoot } from './Card.styles'

export function Card({ padding = 'default', className, children, sx, ...rest }: CardProps) {
  return (
    <CardRoot {...rest} className={className} elevation={0} $padding={padding} sx={sx}>
      {children}
    </CardRoot>
  )
}
