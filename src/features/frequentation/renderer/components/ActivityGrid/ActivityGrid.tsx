import { Icon } from '@ui/components/Icon'
import type { ActivityGridOption, ActivityGridProps } from './types/ActivityGridProps'

const GRID_CLASSES = 'grid grid-cols-3 gap-2'

const TILE_BASE_CLASSES =
  'flex flex-col items-center gap-1.5 px-2 py-3 border rounded-sm cursor-pointer transition-all duration-150 text-xs font-medium select-none'

const TILE_DEFAULT_CLASSES =
  'border-border text-text bg-card hover:border-border-light hover:bg-surface'

const TILE_SELECTED_CLASSES = 'border-accent bg-accent-bg text-accent'

const ICON_CLASSES = 'text-[22px]'

export function ActivityGrid({ options, value, onChange }: ActivityGridProps) {
  function renderTile(option: ActivityGridOption) {
    const isSelected = option.value === value
    const tileClass = [
      TILE_BASE_CLASSES,
      isSelected ? TILE_SELECTED_CLASSES : TILE_DEFAULT_CLASSES
    ].join(' ')

    return (
      <button
        type="button"
        key={option.value}
        className={tileClass}
        data-selected={isSelected}
        aria-pressed={isSelected}
        aria-label={option.label}
        onClick={() => onChange(option.value)}
      >
        <Icon name={option.iconName} className={ICON_CLASSES} />
        <span>{option.label}</span>
      </button>
    )
  }

  return <div className={GRID_CLASSES}>{options.map(renderTile)}</div>
}
