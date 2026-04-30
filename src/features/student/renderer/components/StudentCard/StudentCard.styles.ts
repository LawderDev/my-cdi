import type { SxProps, Theme } from '@mui/material'

const CARD_PADDING = 2
const INE_FONT_SIZE = '0.75rem'
const INE_TOP_MARGIN = 0.5

export const cardStyles: SxProps<Theme> = {
  cursor: 'pointer',
  p: CARD_PADDING,
  '&:hover': {
    backgroundColor: 'action.hover'
  }
}

export const ineLabelStyles: SxProps<Theme> = {
  fontSize: INE_FONT_SIZE,
  color: 'text.secondary',
  mt: INE_TOP_MARGIN
}
