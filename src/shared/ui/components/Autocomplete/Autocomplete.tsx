import MuiAutocomplete from '@mui/material/Autocomplete'
import type { AutocompleteOption, AutocompleteProps } from './types/AutocompleteProps'
import { useAutocomplete } from './hooks/useAutocomplete'

export function Autocomplete<T>(props: AutocompleteProps<T>) {
  const muiProps = useAutocomplete(props)

  return <MuiAutocomplete<AutocompleteOption<T>, false, false, false> {...muiProps} />
}
