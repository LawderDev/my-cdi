import type { CardProps } from './types/CardProps'

const BASE_CLASSES = 'bg-card border border-border rounded shadow'

const PADDING_CLASSES = {
  none: '',
  compact: 'p-4',
  default: 'p-5'
} as const

export function Card({ padding = 'default', className, children, ...rest }: CardProps) {
  const finalClass = [BASE_CLASSES, PADDING_CLASSES[padding], className].filter(Boolean).join(' ')
  return (
    <div {...rest} className={finalClass}>
      {children}
    </div>
  )
}
