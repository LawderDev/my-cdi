import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const GRID_FIRST_COLUMN_PX = 320

export const PageGrid = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'grid',
  gridTemplateColumns: `${GRID_FIRST_COLUMN_PX}px 1fr`,
  gridTemplateRows: '1fr',
  gap: 3,
  height: '100%'
})

export const SideColumn = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  pb: 3
})
