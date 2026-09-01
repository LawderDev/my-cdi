import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import {
  TILE_FONT_SIZE_PX,
  TILE_FONT_WEIGHT,
  TILE_TRANSITION
} from '../../ActivityGridPresenter.styles'

export const TileButton = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $isSelected: boolean }>(({ $isSelected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 0.75,
  px: 1,
  py: 1.5,
  border: '1px solid',
  borderColor: $isSelected ? 'var(--accent)' : 'var(--border)',
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: TILE_TRANSITION,
  fontSize: `${TILE_FONT_SIZE_PX}px`,
  fontWeight: TILE_FONT_WEIGHT,
  userSelect: 'none',
  bgcolor: $isSelected ? 'var(--accent-bg)' : 'var(--card)',
  color: $isSelected ? 'var(--accent)' : 'var(--text)',
  '&:hover': {
    borderColor: $isSelected ? 'var(--accent)' : 'var(--border-light)',
    bgcolor: $isSelected ? 'var(--accent-bg)' : 'var(--surface)'
  }
}))
