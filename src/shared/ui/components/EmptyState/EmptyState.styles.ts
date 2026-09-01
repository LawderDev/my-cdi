import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { CSSProperties } from 'react'
import { theme } from '@ui/theme'

const PY_SPACING = 7.5
const PADDING_X_STEPS = 2.5
const MESSAGE_MB_SPACING = 0.5
const ICON_OPACITY = 0.4
const DESCRIPTION_OPACITY = 0.7

export const ICON_CSS: CSSProperties = {
  fontSize: theme.typography.h2.fontSize,
  marginBottom: theme.spacing(1.5),
  opacity: ICON_OPACITY
}

export const Root = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: theme.palette.text.disabled,
  paddingBlock: theme.spacing(PY_SPACING),
  paddingInline: theme.spacing(PADDING_X_STEPS)
}))

export const MessageText = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginBottom: theme.spacing(MESSAGE_MB_SPACING)
}))

export const DescriptionText = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})({
  opacity: DESCRIPTION_OPACITY
})
