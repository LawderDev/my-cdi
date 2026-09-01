import MuiIconButton from '@mui/material/IconButton'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { CSSProperties } from 'react'
import type { IconButtonTone } from './types/IconButtonProps'
import { TINT_ALPHAS, theme } from '@ui/theme'

const BUTTON_SIZE_PX = 36

export const ICON_FONT_SIZE_CSS: CSSProperties = { fontSize: theme.typography.h6.fontSize }

const HOVER_BG_BY_TONE: Record<IconButtonTone, string> = {
  default: theme.palette.background.paper,
  danger: alpha(theme.palette.error.main, TINT_ALPHAS.surface)
}

const COLOR_BY_TONE: Record<IconButtonTone, string> = {
  default: theme.palette.text.disabled,
  danger: theme.palette.error.main
}

const HOVER_COLOR_BY_TONE: Record<IconButtonTone, string> = {
  default: theme.palette.text.primary,
  danger: theme.palette.error.main
}

export const IconButtonRoot = styled(MuiIconButton, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $tone: IconButtonTone }>(({ theme, $tone }) => ({
  width: `${BUTTON_SIZE_PX}px`,
  height: `${BUTTON_SIZE_PX}px`,
  borderRadius: theme.shape.borderRadius,
  color: COLOR_BY_TONE[$tone],
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    backgroundColor: HOVER_BG_BY_TONE[$tone],
    color: HOVER_COLOR_BY_TONE[$tone]
  }
}))
