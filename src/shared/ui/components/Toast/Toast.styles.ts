import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const TOAST_MAX_WIDTH_PX = 480

export const ToastAlert = styled(Alert, {
  shouldForwardProp: shouldForwardStyledProp
})({
  maxWidth: TOAST_MAX_WIDTH_PX
})
