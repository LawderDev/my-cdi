import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const GRID_FIRST_COLUMN_PX = 320

export const PageGrid = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `${GRID_FIRST_COLUMN_PX}px 1fr`,
  gridTemplateRows: '1fr',
  gap: theme.spacing(3),
  height: '100%'
}))

export const SideColumn = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingBottom: theme.spacing(3)
}))
