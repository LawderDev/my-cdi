import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { Icon } from '../../../Icon'
import type { AutocompleteInputProps } from './types/AutocompleteInputProps'
import { INPUT_FONT_SIZE_PX, INPUT_HEIGHT_PX, SEARCH_ICON_FONT_SIZE_PX } from './AutocompleteInput.styles'

export function AutocompleteInput({ placeholder, params }: AutocompleteInputProps) {
  return (
    <TextField
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
      sx={{
        '& .MuiOutlinedInput-root': {
          height: `${INPUT_HEIGHT_PX}px`,
          fontSize: `${INPUT_FONT_SIZE_PX}px`,
          backgroundColor: 'var(--surface)',
          color: 'var(--title)',
          borderRadius: 'var(--radius-sm)',
          transition: 'border-color 0.2s'
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--border)'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--border-light)'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--accent)',
          boxShadow: '0 0 0 3px var(--accent-bg)'
        }
      }}
    />
  )
}
