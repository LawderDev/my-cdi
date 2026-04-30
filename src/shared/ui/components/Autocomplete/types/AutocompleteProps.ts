export interface AutocompleteOption<T> {
  value: T
  label: string
  badge?: string
}

export interface AutocompleteProps<T> {
  placeholder?: string
  options: AutocompleteOption<T>[]
  onSelect: (option: AutocompleteOption<T>) => void
  inputValue?: string
  onInputChange?: (next: string) => void
  excludedValues?: T[]
  maxResults?: number
}
