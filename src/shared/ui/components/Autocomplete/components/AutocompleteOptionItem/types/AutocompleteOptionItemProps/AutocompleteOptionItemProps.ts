import type { AutocompleteOption } from '../../../../types/AutocompleteProps'
import type { HTMLAttributes } from 'react'

export interface AutocompleteOptionItemProps extends HTMLAttributes<HTMLLIElement> {
  option: AutocompleteOption<unknown>
}
