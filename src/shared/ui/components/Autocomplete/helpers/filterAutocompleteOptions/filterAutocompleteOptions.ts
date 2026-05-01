import type { AutocompleteOption } from '../../types/AutocompleteProps'

export function filterAutocompleteOptions<T>(
  candidates: AutocompleteOption<T>[],
  state: { inputValue: string },
  maxResults: number
): AutocompleteOption<T>[] {
  const term = state.inputValue.trim().toLowerCase()
  const matches =
    term.length === 0
      ? candidates
      : candidates.filter((option) => option.label.toLowerCase().includes(term))
  return matches.slice(0, maxResults)
}
