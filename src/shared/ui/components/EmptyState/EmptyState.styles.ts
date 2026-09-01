import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { CSSProperties } from 'react'

const ICON_FONT_SIZE_PX = 48
const ICON_OPACITY = 0.4
const PY_SPACING = 7.5
const PADDING_X_STEPS = 2.5
const MESSAGE_MB_SPACING = 0.5
const DESCRIPTION_OPACITY = 0.7
const ICON_MARGIN_BOTTOM = '12px'
const MESSAGE_FONT_SIZE = '14px'
const DESCRIPTION_FONT_SIZE = '12px'

export const ICON_CSS: CSSProperties = {
  fontSize: `${ICON_FONT_SIZE_PX}px`,
  marginBottom: ICON_MARGIN_BOTTOM,
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
  color: 'var(--text-dim)',
  paddingBlock: theme.spacing(PY_SPACING),
  paddingInline: theme.spacing(PADDING_X_STEPS)
}))

export const MessageText = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: MESSAGE_FONT_SIZE,
  marginBottom: theme.spacing(MESSAGE_MB_SPACING)
}))

export const DescriptionText = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: DESCRIPTION_FONT_SIZE,
  opacity: DESCRIPTION_OPACITY
})
