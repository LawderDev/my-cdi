import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const TITLE_FONT_SIZE_PX = 15
export const TITLE_FONT_WEIGHT = 600
export const TITLE_ICON_FONT_SIZE_PX = 18
export const COUNT_FONT_SIZE_PX = 12
export const COUNT_FONT_WEIGHT = 600
export const COUNT_BORDER_RADIUS_PX = 10
export const SELECT_HEIGHT_PX = 30
export const SELECT_FONT_SIZE_PX = 12
export const SEARCH_WRAPPER_MAX_WIDTH_PX = 220
export const SEARCH_INPUT_HEIGHT_PX = 30
export const SEARCH_INPUT_FONT_SIZE_PX = 12
export const SEARCH_ICON_FONT_SIZE_PX = 14

export const ToolbarRoot = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: 2.5,
  py: 2,
  borderBottom: '1px solid var(--border)'
})

export const ToolbarTitle = styled('h3', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${TITLE_FONT_SIZE_PX}px`,
  fontWeight: TITLE_FONT_WEIGHT,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  m: 0
})

export const CountBadge = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${COUNT_FONT_SIZE_PX}px`,
  bgcolor: 'var(--accent-bg)',
  color: 'var(--accent)',
  px: 1.25,
  py: 0.25,
  borderRadius: `${COUNT_BORDER_RADIUS_PX}px`,
  fontWeight: COUNT_FONT_WEIGHT
})

export const ToolbarControls = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5
})

export const SearchField = styled(TextField, {
  shouldForwardProp: shouldForwardStyledProp
})({
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

export const PeriodSelect = styled(Select, {
  shouldForwardProp: shouldForwardStyledProp
})({
  height: `${SELECT_HEIGHT_PX}px`,
  fontSize: `${SELECT_FONT_SIZE_PX}px`,
  color: 'var(--text)',
  bgcolor: 'var(--surface)',
  borderRadius: 'var(--radius-xs)',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--border)'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--border-light)'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--accent)'
  },
  '& .MuiSelect-select': {
    py: 0,
    pl: 1.25,
    pr: 3,
    display: 'flex',
    alignItems: 'center',
    minHeight: 0,
    height: `${SELECT_HEIGHT_PX}px`
  }
})
