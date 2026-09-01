import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import {
  TILE_FONT_SIZE_PX,
  TILE_FONT_WEIGHT,
  TILE_TRANSITION
} from '../../ActivityGridPresenter.styles'

export const TileButton = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $isSelected: boolean }>(({ theme, $isSelected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  paddingInline: theme.spacing(1),
  paddingBlock: theme.spacing(1.5),
  border: '1px solid',
  borderColor: $isSelected ? 'var(--accent)' : 'var(--border)',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: TILE_TRANSITION,
  fontSize: `${TILE_FONT_SIZE_PX}px`,
  fontWeight: TILE_FONT_WEIGHT,
  userSelect: 'none',
  backgroundColor: $isSelected ? 'var(--accent-bg)' : 'var(--card)',
  color: $isSelected ? 'var(--accent)' : 'var(--text)',
  '&:hover': {
    borderColor: $isSelected ? 'var(--accent)' : 'var(--border-light)',
    backgroundColor: $isSelected ? 'var(--accent-bg)' : 'var(--surface)'
  }
}))
