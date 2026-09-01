import type { ActivityType } from '@types'
import type { ActivityGridOption, ActivityGridTile } from '../../types/ActivityGridPresenterProps'

export function buildActivityTiles(
  options: ActivityGridOption[],
  value: ActivityType,
  onChange: (next: ActivityType) => void
): ActivityGridTile[] {
  return options.map((option) => ({
    value: option.value,
    label: option.label,
    iconName: option.iconName,
    isSelected: option.value === value,
    onClick: () => {
      onChange(option.value)
    }
  }))
}
