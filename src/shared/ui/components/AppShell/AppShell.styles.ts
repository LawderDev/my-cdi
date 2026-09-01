import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
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
})(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  paddingInline: theme.spacing(MAIN_PADDING_X),
  paddingBlock: theme.spacing(MAIN_PADDING_Y)
}))
