import MuiAutocomplete from '@mui/material/Autocomplete'
import type { AutocompleteOption, AutocompleteProps } from './types/AutocompleteProps'
import { AutocompleteOptionItem } from './components/AutocompleteOptionItem'
import { AutocompleteInput } from './components/AutocompleteInput'
import { filterAutocompleteOptions } from './helpers/filterAutocompleteOptions'
import { filterExcludedOptions } from './helpers/filterExcludedOptions'

const DEFAULT_MAX_RESULTS = 8

function getOptionLabel<T>(option: AutocompleteOption<T>): string {
  return option.label
}

function isOptionEqualToValue<T>(
  option: AutocompleteOption<T>,
  value: AutocompleteOption<T>
): boolean {
  return option.value === value.value
}

export function Autocomplete<T>({
  placeholder,
  options,
  onSelect,
  inputValue,
  onInputChange,
  excludedValues,
  maxResults = DEFAULT_MAX_RESULTS,
  disableCloseOnSelect = false
}: AutocompleteProps<T>) {
  const filteredOptions = filterExcludedOptions(options, excludedValues)

  return (
    <MuiAutocomplete<AutocompleteOption<T>, false, false, false>
      options={filteredOptions}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={(candidates, state) =>
        filterAutocompleteOptions(candidates, state, maxResults)
      }
      inputValue={inputValue}
      onInputChange={(_event, value) => {
        if (onInputChange) {
          onInputChange(value)
        }
      }}
      onChange={(_event, value) => {
        if (value !== null) {
          onSelect(value)
          if (onInputChange) {
            onInputChange('')
          }
        }
      }}
      blurOnSelect={!disableCloseOnSelect}
      disableCloseOnSelect={disableCloseOnSelect}
      clearOnBlur={false}
      value={null}
      renderOption={(props, option) => <AutocompleteOptionItem {...props} option={option} />}
      renderInput={(params) => <AutocompleteInput placeholder={placeholder} params={params} />}
    />
  )
}
