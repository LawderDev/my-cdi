import type { RefObject } from 'react'
import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete'

export interface AutocompleteInputProps {
  placeholder?: string
  params: AutocompleteRenderInputParams
  inputRef?: RefObject<HTMLInputElement | null>
}
