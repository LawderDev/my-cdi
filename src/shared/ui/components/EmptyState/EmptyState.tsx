import { Icon } from '../Icon'
import type { EmptyStateProps } from './types/EmptyStateProps'
import { DescriptionText, ICON_CSS, MessageText, Root } from './EmptyState.styles'

export function EmptyState({ iconName, message, description, className }: EmptyStateProps) {
  return (
    <Root className={className}>
      <Icon name={iconName} style={ICON_CSS} />
      <MessageText variant="subtitle2">{message}</MessageText>
      {description ? <DescriptionText variant="body2">{description}</DescriptionText> : null}
    </Root>
  )
}
