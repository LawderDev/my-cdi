import { Icon } from '../Icon'
import type { IconButtonProps, IconButtonTone } from './types/IconButtonProps'
import { IconButtonRoot } from './IconButton.styles'

const TONE_TO_COLOR: Record<IconButtonTone, 'default' | 'error'> = {
  default: 'default',
  danger: 'error'
}

export function IconButton({ iconName, tone = 'default', className, ...rest }: IconButtonProps) {
  return (
    <IconButtonRoot
      {...rest}
      className={className}
      color={TONE_TO_COLOR[tone]}
      size="small"
      data-tone={tone}
      $tone={tone}
    >
      <Icon name={iconName} />
    </IconButtonRoot>
  )
}
