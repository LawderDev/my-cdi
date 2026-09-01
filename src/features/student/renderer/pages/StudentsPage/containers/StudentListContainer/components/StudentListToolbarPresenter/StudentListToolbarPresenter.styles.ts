import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const SMALL_ICON_FONT_SIZE_PX = 16
export const SMALL_ICON_STYLE = { fontSize: SMALL_ICON_FONT_SIZE_PX } as const

export const SEARCH_WRAPPER_MAX_WIDTH_PX = 380
export const SEARCH_INPUT_HEIGHT_PX = 40
export const SEARCH_INPUT_FONT_SIZE_PX = 13
export const SEARCH_ICON_FONT_SIZE_PX = 18
export const COUNT_FONT_SIZE_PX = 12
export const COUNT_FONT_WEIGHT = 500

export const ToolbarRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  mb: 2.5
})

export const SearchField = styled(TextField, {
  shouldForwardProp: shouldForwardStyledProp
})({
  flex: 1,
  maxWidth: `${SEARCH_WRAPPER_MAX_WIDTH_PX}px`,
  '& .MuiOutlinedInput-root': {
    height: `${SEARCH_INPUT_HEIGHT_PX}px`,
    fontSize: `${SEARCH_INPUT_FONT_SIZE_PX}px`,
    bgcolor: 'var(--surface)',
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
})

export const CountLabel = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${COUNT_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  fontWeight: COUNT_FONT_WEIGHT
})

export const ToolbarSpacer = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  flex: 1
})
