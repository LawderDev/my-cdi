import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { TYPE_SCALE } from '@ui/theme'

export const GRID_COLUMNS = 3
export const ICON_FONT_SIZE_PX = TYPE_SCALE.h5

export const GridRoot = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
  gap: theme.spacing(1)
}))
