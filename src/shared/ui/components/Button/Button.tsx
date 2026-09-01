import type { ButtonProps, ButtonVariant } from './types/ButtonProps'
import { ButtonRoot } from './Button.styles'

interface MuiButtonStyle {
  variant: 'contained' | 'outlined'
  color: 'primary' | 'inherit' | 'error'
}

const VARIANT_MAP: Record<ButtonVariant, MuiButtonStyle> = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'outlined', color: 'inherit' },
  danger: { variant: 'contained', color: 'error' }
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  iconLeft,
  iconRight,
  children,
  className,
  ...rest
}: ButtonProps) {
  const muiStyle = VARIANT_MAP[variant]
  return (
    <ButtonRoot
      {...rest}
      className={className}
      variant={muiStyle.variant}
      color={muiStyle.color}
      fullWidth={fullWidth}
      startIcon={iconLeft}
      endIcon={iconRight}
      data-variant={variant}
    >
      {children}
    </ButtonRoot>
  )
}
