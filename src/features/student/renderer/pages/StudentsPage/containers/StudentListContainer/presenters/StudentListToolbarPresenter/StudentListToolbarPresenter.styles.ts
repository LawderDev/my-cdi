import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { Icon } from '@ui/components/Icon'
import { RADII, TINT_ALPHAS, TYPE_SCALE } from '@ui/theme'

export const SMALL_ICON_FONT_SIZE_PX = TYPE_SCALE.subtitle1
export const SMALL_ICON_STYLE = { fontSize: SMALL_ICON_FONT_SIZE_PX } as const

const SEARCH_WRAPPER_MAX_WIDTH_PX = 380
const SEARCH_INPUT_HEIGHT_PX = 40
const INPUT_TRANSITION = 'border-color'
export const SEARCH_ICON_FONT_SIZE_PX = TYPE_SCALE.h6

export const ToolbarRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5)
}))

export const SearchField = styled(TextField, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  flex: 1,
  maxWidth: `${SEARCH_WRAPPER_MAX_WIDTH_PX}px`,
  '& .MuiOutlinedInput-root': {
    height: `${SEARCH_INPUT_HEIGHT_PX}px`,
    fontSize: theme.typography.body1.fontSize,
    backgroundColor: theme.palette.surface,
    color: theme.palette.text.primary,
    borderRadius: RADII.small,
    transition: theme.transitions.create(INPUT_TRANSITION)
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

export const SearchIcon = styled(Icon)(({ theme }) => ({
  fontSize: SEARCH_ICON_FONT_SIZE_PX,
  color: theme.palette.text.disabled
}))

export const CountLabel = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled
}))

export const ToolbarSpacer = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  flex: 1
})
