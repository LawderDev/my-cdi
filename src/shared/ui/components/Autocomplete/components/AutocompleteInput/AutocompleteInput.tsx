import { useForkRef } from '@mui/material/utils'
import InputAdornment from '@mui/material/InputAdornment'
import type { AutocompleteInputProps } from './types/AutocompleteInputProps'
import { InputField, SearchIcon } from './AutocompleteInput.styles'

export function AutocompleteInput({ placeholder, params, inputRef }: AutocompleteInputProps) {
  // MUI's Autocomplete installs its own ref on the native input via
  // slotProps.htmlInput (focus management); fork-merge it with the caller's
  // ref so both keep working.
  const { htmlInput } = params.slotProps
  const handleInputRef = useForkRef(htmlInput.ref, inputRef ?? null)
  return (
    <InputField
      {...params}
      placeholder={placeholder}
      size="small"
      variant="outlined"
      slotProps={{
        input: {
          ...params.slotProps.input,
          endAdornment: null,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon name="search" />
            </InputAdornment>
          )
        },
        htmlInput: { ...htmlInput, ref: handleInputRef }
      }}
    />
  )
}
