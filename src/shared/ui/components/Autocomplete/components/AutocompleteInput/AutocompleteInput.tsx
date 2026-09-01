import InputAdornment from '@mui/material/InputAdornment'
import { Icon } from '../../../Icon'
import type { AutocompleteInputProps } from './types/AutocompleteInputProps'
import { InputField, SEARCH_ICON_FONT_SIZE_PX } from './AutocompleteInput.styles'

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
              <Icon
                name="search"
                style={{
                  fontSize: `${SEARCH_ICON_FONT_SIZE_PX}px`,
                  color: 'var(--text-dim)'
                }}
              />
            </InputAdornment>
          )
        },
        htmlInput: params.slotProps.htmlInput
      }}
    />
  )
}
