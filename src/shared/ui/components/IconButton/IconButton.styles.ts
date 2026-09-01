import MuiIconButton from '@mui/material/IconButton'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { CSSProperties } from 'react'
import type { IconButtonTone } from './types/IconButtonProps'

const BUTTON_SIZE_PX = 36
const ICON_FONT_SIZE_PX = 18
const TRANSITION = 'all 0.15s'

export const ICON_FONT_SIZE_CSS: CSSProperties = { fontSize: `${ICON_FONT_SIZE_PX}px` }

const HOVER_BG_BY_TONE: Record<IconButtonTone, string> = {
  default: 'var(--card)',
  danger: 'var(--danger-bg)'
}

const COLOR_BY_TONE: Record<IconButtonTone, string> = {
  default: 'var(--text-dim)',
  danger: 'var(--danger)'
}

const HOVER_COLOR_BY_TONE: Record<IconButtonTone, string> = {
  default: 'var(--title)',
  danger: 'var(--danger)'
}

export const IconButtonRoot = styled(MuiIconButton, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $tone: IconButtonTone }>(({ $tone }) => ({
  width: `${BUTTON_SIZE_PX}px`,
  height: `${BUTTON_SIZE_PX}px`,
  borderRadius: 'var(--radius-xs)',
  color: COLOR_BY_TONE[$tone],
  transition: TRANSITION,
  '&:hover': {
    backgroundColor: HOVER_BG_BY_TONE[$tone],
    color: HOVER_COLOR_BY_TONE[$tone]
  }
}))
