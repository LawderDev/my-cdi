import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, RADII } from '@ui/theme'

export const EntrySummary = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.25),
  backgroundColor: theme.palette.surface,
  borderRadius: RADII.small
}))

export const StudentName = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontWeight: FONT_WEIGHTS.medium,
  color: theme.palette.text.primary
}))

export const StudentClasse = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled
}))
