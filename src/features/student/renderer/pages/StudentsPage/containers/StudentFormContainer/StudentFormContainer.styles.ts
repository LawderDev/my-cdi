import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { RADII, TINT_ALPHAS } from '@ui/theme'

const INPUT_HEIGHT_PX = 40

const INPUT_TRANSITION_DURATION = 'border-color'

export const FieldRow = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginBottom: theme.spacing(2)
}))

export const FieldLabel = styled('label', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'block',
  fontSize: theme.typography.overline.fontSize,
  fontWeight: theme.typography.overline.fontWeight,
  color: theme.palette.text.disabled,
  textTransform: 'uppercase',
  letterSpacing: theme.typography.overline.letterSpacing,
  marginBottom: theme.spacing(0.75)
}))

export const FieldError = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.error.main
}))

export const FieldInput = styled(TextField, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: `${INPUT_HEIGHT_PX}px`,
    fontSize: theme.typography.body1.fontSize,
    backgroundColor: theme.palette.surface,
    color: theme.palette.text.primary,
    borderRadius: RADII.small,
    transition: theme.transitions.create(INPUT_TRANSITION_DURATION)
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
  },
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main
  },
  '& .MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main
  },
  '& .MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
    boxShadow: 'none'
  }
}))
