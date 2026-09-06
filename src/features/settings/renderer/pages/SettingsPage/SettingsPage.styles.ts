import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const SettingsLayout = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  maxWidth: '720px'
}))

export const SectionTitle = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  ...theme.typography.h6,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5)
}))

export const SectionDescription = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3)
}))
