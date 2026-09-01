import Box from '@mui/material/Box'
import { Icon } from '@ui/components/Icon'
import type { ActivityGridTile } from '../../types/ActivityGridPresenterProps'
import { ICON_FONT_SIZE_PX } from '../../ActivityGridPresenter.styles'
import { TileButton } from './ActivityGridTile.styles'

interface ActivityGridTileProps {
  tile: ActivityGridTile
}

export function ActivityGridTile({ tile }: ActivityGridTileProps) {
  return (
    <TileButton
      type="button"
      $isSelected={tile.isSelected}
      data-selected={tile.isSelected}
      aria-pressed={tile.isSelected}
      aria-label={tile.label}
      onClick={tile.onClick}
    >
      <Icon name={tile.iconName} style={{ fontSize: `${ICON_FONT_SIZE_PX}px` }} />
      <Box component="span">{tile.label}</Box>
    </TileButton>
  )
}
