import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, RADII, TINT_ALPHAS, TYPE_SCALE } from '@ui/theme'

const SELECT_HEIGHT_PX = 30
const SEARCH_WRAPPER_MAX_WIDTH_PX = 220
const SEARCH_INPUT_HEIGHT_PX = 30

export const TITLE_ICON_FONT_SIZE_PX = TYPE_SCALE.h6
export const SEARCH_ICON_FONT_SIZE_PX = TYPE_SCALE.subtitle2

export const ToolbarRoot = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInline: theme.spacing(2.5),
  paddingBlock: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

export const ToolbarTitle = styled('h3', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  margin: 0,
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: FONT_WEIGHTS.semibold
}))

export const CountBadge = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  paddingInline: theme.spacing(1.25),
  paddingBlock: theme.spacing(0.25),
  borderRadius: RADII.small,
  backgroundColor: alpha(theme.palette.primary.main, TINT_ALPHAS.surface),
  color: theme.palette.primary.main,
  fontWeight: FONT_WEIGHTS.semibold
}))

export const ToolbarControls = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5)
}))

export const SearchField = styled(TextField, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  maxWidth: `${SEARCH_WRAPPER_MAX_WIDTH_PX}px`,
  '& .MuiOutlinedInput-root': {
    height: `${SEARCH_INPUT_HEIGHT_PX}px`,
    fontSize: theme.typography.body2.fontSize,
    backgroundColor: theme.palette.surface,
    color: theme.palette.text.primary,
    borderRadius: RADII.small,
    transition: theme.transitions.create('border-color')
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.dividerStrong
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, TINT_ALPHAS.surface)}`
  }
}))

export const PeriodSelect = styled(Select, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  height: `${SELECT_HEIGHT_PX}px`,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.surface,
  borderRadius: RADII.small,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.dividerStrong
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main
  },
  '& .MuiSelect-select': {
    paddingBlock: 0,
    paddingLeft: theme.spacing(1.25),
    paddingRight: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    minHeight: 0,
    height: `${SELECT_HEIGHT_PX}px`
  }
}))
