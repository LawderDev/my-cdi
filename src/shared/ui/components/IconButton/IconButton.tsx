import { Icon } from '../Icon'
import type { IconButtonProps } from './types/IconButtonProps'

const BASE_CLASSES =
  'w-9 h-9 rounded-xs inline-flex items-center justify-center transition-all duration-150'

const TONE_CLASSES = {
  default: 'text-text-dim hover:bg-card hover:text-title',
  danger: 'text-danger hover:bg-danger-bg'
} as const

export function IconButton({ iconName, tone = 'default', className, ...rest }: IconButtonProps) {
  const finalClass = [BASE_CLASSES, TONE_CLASSES[tone], className].filter(Boolean).join(' ')
  return (
    <button {...rest} className={finalClass}>
      <Icon name={iconName} />
    </button>
  )
}
