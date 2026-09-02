import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const CHIPS_MIN_HEIGHT_PX = 28

export const FieldLabel = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'block',
  color: theme.palette.text.disabled,
  marginBottom: theme.spacing(0.75)
}))

export const ChipsRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
  minHeight: `${CHIPS_MIN_HEIGHT_PX}px`,
  marginTop: theme.spacing(1)
}))
