import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const GRID_COLUMNS = 3
export const ICON_FONT_SIZE_PX = 22
export const TILE_FONT_SIZE_PX = 12
export const TILE_FONT_WEIGHT = 500
export const TILE_TRANSITION = 'all 0.15s'

export const GridRoot = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
  gap: theme.spacing(1)
}))
