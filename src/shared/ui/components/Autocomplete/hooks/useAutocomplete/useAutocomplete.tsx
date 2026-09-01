import type { AutocompleteProps } from '@mui/material/Autocomplete'
import type {
  AutocompleteOption,
  AutocompleteProps as UiAutocompleteProps
} from '../../types/AutocompleteProps'
import { AutocompleteOptionItem } from '../../components/AutocompleteOptionItem'
import { AutocompleteInput } from '../../components/AutocompleteInput'
import { filterAutocompleteOptions } from '../../helpers/filterAutocompleteOptions'
import { filterExcludedOptions } from '../../helpers/filterExcludedOptions'

const DEFAULT_MAX_RESULTS = 8

type MuiProps<T> = AutocompleteProps<AutocompleteOption<T>, false, false, false>

function getOptionLabel<T>(option: AutocompleteOption<T>): string {
  return option.label
}

function isOptionEqualToValue<T>(
  option: AutocompleteOption<T>,
  value: AutocompleteOption<T>
): boolean {
  return option.value === value.value
}

export function useAutocomplete<T>(props: UiAutocompleteProps<T>): MuiProps<T> {
  const {
    placeholder,
    options,
    onSelect,
    inputValue,
    onInputChange,
    excludedValues,
    maxResults = DEFAULT_MAX_RESULTS,
    disableCloseOnSelect = false
  } = props

  const filteredOptions = filterExcludedOptions(options, excludedValues)

  return {
    options: filteredOptions,
    getOptionLabel,
    isOptionEqualToValue,
    filterOptions: (candidates, state) => filterAutocompleteOptions(candidates, state, maxResults),
    inputValue,
    onInputChange: (_event, value) => {
      if (onInputChange) {
        onInputChange(value)
      }
    },
    onChange: (_event, value) => {
      if (value !== null) {
        onSelect(value)
        if (onInputChange) {
          onInputChange('')
        }
      }
    },
    blurOnSelect: !disableCloseOnSelect,
    disableCloseOnSelect,
    clearOnBlur: false,
    value: null,
    renderOption: (renderProps, option) => (
      <AutocompleteOptionItem {...renderProps} option={option} />
    ),
    renderInput: (params) => <AutocompleteInput placeholder={placeholder} params={params} />
  }
}
