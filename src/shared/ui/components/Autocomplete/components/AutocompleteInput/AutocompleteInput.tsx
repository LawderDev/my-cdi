import InputAdornment from '@mui/material/InputAdornment'
import type { AutocompleteInputProps } from './types/AutocompleteInputProps'
import { InputField, SearchIcon } from './AutocompleteInput.styles'

export function AutocompleteInput({ placeholder, params }: AutocompleteInputProps) {
  return (
    <InputField
      {...params}
      placeholder={placeholder}
      size="small"
      variant="outlined"
      slotProps={{
        input: {
          ...params.slotProps.input,
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon name="search" />
            </InputAdornment>
          )
        },
        htmlInput: params.slotProps.htmlInput
      }}
    />
  )
}
