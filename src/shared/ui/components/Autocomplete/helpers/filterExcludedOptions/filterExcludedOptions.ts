import type { AutocompleteOption } from '../../types/AutocompleteProps'

export function filterExcludedOptions<T>(
  options: AutocompleteOption<T>[],
  excludedValues: T[] | undefined
): AutocompleteOption<T>[] {
  const excludedSet = new Set(excludedValues ?? [])
  return options.filter((option) => !excludedSet.has(option.value))
}
