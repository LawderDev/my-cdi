import { AccentSwatchButton } from './AccentSwatchPresenter.styles'
import type { AccentSwatchPresenterProps } from './types/AccentSwatchPresenterProps'

export function AccentSwatchPresenter({
  label,
  swatch,
  isActive,
  onSelect
}: AccentSwatchPresenterProps) {
  return (
    <AccentSwatchButton
      type="button"
      $swatchMain={swatch.main}
      $swatchBackground={swatch.background}
      data-active={isActive}
      aria-pressed={isActive}
      aria-label={label}
      title={label}
      onClick={onSelect}
    />
  )
}
