import Box from '@mui/material/Box'
import { Icon } from '@ui/components/Icon'
import type { ActivityTone } from '@ui/theme'
import { getActivityTone } from '@frequentation/helpers/activityFormatters'
import type { ActivityGridTile } from '../../types/ActivityGridPresenterProps'
import { ICON_FONT_SIZE_PX } from '../../ActivityGridPresenter.styles'
import { TileButton } from './ActivityGridTile.styles'

interface ActivityGridTileProps {
  tile: ActivityGridTile
}

export function ActivityGridTile({ tile }: ActivityGridTileProps) {
  const tone: ActivityTone = getActivityTone(tile.value)
  return (
    <TileButton
      type="button"
      $tone={tone}
      $isSelected={tile.isSelected}
      data-tone={tone}
      data-selected={tile.isSelected}
      aria-pressed={tile.isSelected}
      aria-label={tile.label}
      onClick={tile.onClick}
    >
      <Icon name={tile.iconName} style={{ fontSize: ICON_FONT_SIZE_PX }} />
      <Box component="span">{tile.label}</Box>
    </TileButton>
  )
}
