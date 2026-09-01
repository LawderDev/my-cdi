import MuiButton from '@mui/material/Button'
import type { ButtonProps, ButtonVariant } from './types/ButtonProps'
import { SX_BY_VARIANT } from './Button.styles'

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
    <MuiButton
      {...rest}
      className={className}
      variant={muiStyle.variant}
      color={muiStyle.color}
      fullWidth={fullWidth}
      startIcon={iconLeft}
      endIcon={iconRight}
      data-variant={variant}
      sx={SX_BY_VARIANT[variant]}
    >
      {children}
    </MuiButton>
  )
}
