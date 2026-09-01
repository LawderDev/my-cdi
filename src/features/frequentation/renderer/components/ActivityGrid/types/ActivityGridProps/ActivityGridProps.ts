import type { ReactNode } from 'react'
import type { ActivityType } from '@types'

export interface ActivityGridOption {
  value: ActivityType
  label: string
  iconName: string
}

export interface ActivityGridTile {
  value: ActivityType
  label: string
  iconName: string
  isSelected: boolean
  onClick: () => void
}

export interface ActivityGridProps {
  tileNodes: ReactNode[]
}
