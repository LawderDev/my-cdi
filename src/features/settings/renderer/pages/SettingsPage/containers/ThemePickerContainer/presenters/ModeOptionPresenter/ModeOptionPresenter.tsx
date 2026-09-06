import { ModeOptionButton } from './ModeOptionPresenter.styles'
import type { ModeOptionPresenterProps } from './types/ModeOptionPresenterProps'

export function ModeOptionPresenter({ label, isActive, onSelect }: ModeOptionPresenterProps) {
  return (
    <ModeOptionButton
      type="button"
      data-active={isActive}
      aria-pressed={isActive}
      onClick={onSelect}
    >
      {label}
    </ModeOptionButton>
  )
}
