import { Icon } from '../../../../../Icon'
import type { NavButtonProps } from './types/NavButtonProps'
import { ICON_FONT_SIZE_PX, NavButtonRoot } from './NavButton.styles'

export function NavButton({ active, iconName, label, ariaCurrent, onClick }: NavButtonProps) {
  return (
    <NavButtonRoot
      type="button"
      title={label}
      aria-label={label}
      aria-current={ariaCurrent}
      onClick={onClick}
      $active={active}
    >
      <Icon name={iconName} style={{ fontSize: `${ICON_FONT_SIZE_PX}px` }} />
    </NavButtonRoot>
  )
}
