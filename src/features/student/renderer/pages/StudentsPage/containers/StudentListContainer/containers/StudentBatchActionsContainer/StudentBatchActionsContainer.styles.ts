import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { RADII } from '@ui/theme'

export const NO_SELECTION = 0

export const BatchActionsStrip = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  paddingInline: theme.spacing(1.5),
  paddingBlock: theme.spacing(1),
  backgroundColor: theme.palette.surface,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: RADII.small,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.disabled
}))

export const BatchCountLabel = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled
}))
