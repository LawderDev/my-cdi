import TextField from '@mui/material/TextField'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const SEARCH_ICON_FONT_SIZE_PX = 20

const INPUT_HEIGHT_PX = 42
const INPUT_FONT_SIZE_PX = 13
const OUTLINE_TRANSITION = 'border-color 0.2s'

export const InputField = styled(TextField, {
  shouldForwardProp: shouldForwardStyledProp
})({
  '& .MuiOutlinedInput-root': {
    height: `${INPUT_HEIGHT_PX}px`,
    fontSize: `${INPUT_FONT_SIZE_PX}px`,
    backgroundColor: 'var(--surface)',
    color: 'var(--title)',
    borderRadius: 'var(--radius-sm)',
    transition: OUTLINE_TRANSITION
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
})
