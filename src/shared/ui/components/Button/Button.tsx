import type { ButtonProps } from './types/ButtonProps'

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

const VARIANT_CLASSES = {
  primary:
    'h-10 px-5 bg-accent text-white rounded-sm text-[13px] font-semibold shadow-[0_2px_8px_rgba(124,77,255,0.3)] hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(124,77,255,0.4)] hover:-translate-y-px active:translate-y-0',
  secondary:
    'h-9 px-4 bg-surface text-title border border-border rounded-sm text-[13px] hover:bg-card hover:border-border-light',
  danger:
    'h-9 px-4 bg-danger-bg text-danger border border-danger/25 rounded-sm text-[13px] hover:bg-danger/20'
} as const

export function Button({
  variant = 'primary',
  fullWidth = false,
  iconLeft,
  iconRight,
  children,
  className,
  ...rest
}: ButtonProps) {
  const variantClass = VARIANT_CLASSES[variant]
  const widthClass = fullWidth ? 'w-full' : ''
  const finalClass = [BASE_CLASSES, variantClass, widthClass, className].filter(Boolean).join(' ')
  return (
    <button {...rest} className={finalClass}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
