import type { AutocompleteOptionItemProps } from './types/AutocompleteOptionItemProps'
import { OptionBadge, OptionRoot } from './AutocompleteOptionItem.styles'

export function AutocompleteOptionItem({ option, ...props }: AutocompleteOptionItemProps) {
  return (
    <OptionRoot {...props}>
      <span>{option.label}</span>
      {option.badge ? <OptionBadge>{option.badge}</OptionBadge> : null}
    </OptionRoot>
  )
}
