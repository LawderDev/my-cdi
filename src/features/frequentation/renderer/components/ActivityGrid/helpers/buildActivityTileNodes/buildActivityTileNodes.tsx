import type { ReactNode } from 'react'
import { ActivityGridTile } from '../../components/ActivityGridTile'
import type { ActivityGridTile as ActivityGridTileModel } from '../../types/ActivityGridProps'

export function buildActivityTileNodes(tiles: ActivityGridTileModel[]): ReactNode[] {
  return tiles.map((tile) => <ActivityGridTile key={tile.value} tile={tile} />)
}
