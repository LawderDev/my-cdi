import TextField from '@mui/material/TextField'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { TINT_ALPHAS, theme } from '@ui/theme'
import { Icon } from '../../../Icon'

export const SEARCH_ICON_FONT_SIZE_PX = theme.typography.h5.fontSize

const INPUT_HEIGHT_PX = 42
const FOCUS_RING_SPREAD_PX = 3
const FOCUS_RING_ALPHA = TINT_ALPHAS.surface

export const SearchIcon = styled(Icon, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled
}))

export const InputField = styled(TextField, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: `${INPUT_HEIGHT_PX}px`,
    fontSize: theme.typography.body1.fontSize,
    backgroundColor: theme.palette.surface,
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('border-color', {
      duration: theme.transitions.duration.standard
    })
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.dividerStrong
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 ${FOCUS_RING_SPREAD_PX}px ${alpha(theme.palette.primary.main, FOCUS_RING_ALPHA)}`
  }
}))
