import type { EmptyStateProps } from './types/EmptyStateProps'
import { DescriptionText, EmptyIcon, MessageText, Root } from './EmptyState.styles'

export function EmptyState({ iconName, message, description, className }: EmptyStateProps) {
  return (
    <Root className={className}>
      <EmptyIcon name={iconName} />
      <MessageText variant="subtitle2">{message}</MessageText>
      {description ? <DescriptionText variant="body2">{description}</DescriptionText> : null}
    </Root>
  )
}
