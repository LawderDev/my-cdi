import Box from '@mui/material/Box'
import { Icon } from '@ui/components/Icon'
import type { ActivityGridOption, ActivityGridProps } from './types/ActivityGridProps'
import { GRID_COLUMNS, ICON_FONT_SIZE_PX, TILE_FONT_SIZE_PX, TILE_FONT_WEIGHT, TILE_TRANSITION } from './ActivityGrid.styles'

export function ActivityGrid({ options, value, onChange }: ActivityGridProps) {
  function renderTile(option: ActivityGridOption) {
    const isSelected = option.value === value
    return (
      <Box
        component="button"
        type="button"
        key={option.value}
        data-selected={isSelected}
        aria-pressed={isSelected}
        aria-label={option.label}
        onClick={() => onChange(option.value)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.75,
          px: 1,
          py: 1.5,
          border: '1px solid',
          borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          transition: TILE_TRANSITION,
          fontSize: `${TILE_FONT_SIZE_PX}px`,
          fontWeight: TILE_FONT_WEIGHT,
          userSelect: 'none',
          bgcolor: isSelected ? 'var(--accent-bg)' : 'var(--card)',
          color: isSelected ? 'var(--accent)' : 'var(--text)',
          '&:hover': {
            borderColor: isSelected ? 'var(--accent)' : 'var(--border-light)',
            bgcolor: isSelected ? 'var(--accent-bg)' : 'var(--surface)'
          }
        }}
      >
        <Icon name={option.iconName} style={{ fontSize: `${ICON_FONT_SIZE_PX}px` }} />
        <Box component="span">{option.label}</Box>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`, gap: 1 }}>
      {options.map(renderTile)}
    </Box>
  )
}
