import { Icon } from '../Icon'
import type { EmptyStateProps } from './types/EmptyStateProps'

const BASE_CLASSES =
  'flex flex-col items-center justify-center px-5 py-15 text-text-dim text-center'

const ICON_CLASSES = 'text-5xl mb-3 opacity-40'

export function EmptyState({ iconName, message, description, className }: EmptyStateProps) {
  const finalClass = [BASE_CLASSES, className].filter(Boolean).join(' ')
  return (
    <div className={finalClass}>
      <Icon name={iconName} className={ICON_CLASSES} />
      <p className="text-sm mb-1">{message}</p>
      {description ? <p className="text-xs">{description}</p> : null}
    </div>
  )
}
