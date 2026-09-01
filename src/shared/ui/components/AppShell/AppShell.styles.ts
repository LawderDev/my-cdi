import Box from '@mui/material/Box'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const MAIN_PADDING_X = 3.5
const MAIN_PADDING_Y = 3

export const ShellRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden'
})

export const ContentColumn = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: 'hidden'
})

export const MainArea = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  flex: 1,
  overflowY: 'auto',
  px: MAIN_PADDING_X,
  py: MAIN_PADDING_Y
})
