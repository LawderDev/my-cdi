import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const MessageText = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  color: 'var(--text)'
})
