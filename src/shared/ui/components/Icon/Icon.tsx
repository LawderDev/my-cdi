import type { IconProps } from './types/IconProps'

export function Icon({ name, className, style, ariaLabel }: IconProps) {
  const finalClassName = className ? `material-icons-round ${className}` : 'material-icons-round'
  return (
    <span
      className={finalClassName}
      style={style}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {name}
    </span>
  )
}
