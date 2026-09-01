import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { Icon } from '@ui/components/Icon'

export const ChartCardTitle = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1)
}))

export const ChartCardTitleIcon = styled(Icon, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.primary.main
}))
