import Box from '@mui/material/Box'
import { Icon } from '@ui/components/Icon'
import type { ActivityGridTile } from '../../types/ActivityGridPresenterProps'
import {
  ICON_FONT_SIZE_PX,
  TILE_FONT_SIZE_PX,
  TILE_FONT_WEIGHT,
  TILE_TRANSITION
} from '../../ActivityGridPresenter.styles'

interface ActivityGridTileProps {
  tile: ActivityGridTile
}

export function ActivityGridTile({ tile }: ActivityGridTileProps) {
  return (
    <Box
      component="button"
      type="button"
      data-selected={tile.isSelected}
      aria-pressed={tile.isSelected}
      aria-label={tile.label}
      onClick={tile.onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.75,
        px: 1,
        py: 1.5,
        border: '1px solid',
        borderColor: tile.isSelected ? 'var(--accent)' : 'var(--border)',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        transition: TILE_TRANSITION,
        fontSize: `${TILE_FONT_SIZE_PX}px`,
        fontWeight: TILE_FONT_WEIGHT,
        userSelect: 'none',
        bgcolor: tile.isSelected ? 'var(--accent-bg)' : 'var(--card)',
        color: tile.isSelected ? 'var(--accent)' : 'var(--text)',
        '&:hover': {
          borderColor: tile.isSelected ? 'var(--accent)' : 'var(--border-light)',
          bgcolor: tile.isSelected ? 'var(--accent-bg)' : 'var(--surface)'
        }
      }}
    >
      <Icon name={tile.iconName} style={{ fontSize: `${ICON_FONT_SIZE_PX}px` }} />
      <Box component="span">{tile.label}</Box>
    </Box>
  )
}
