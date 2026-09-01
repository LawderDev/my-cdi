import Box from '@mui/material/Box'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const StudentsPageLayout = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5
})
