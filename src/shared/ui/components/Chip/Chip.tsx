import type { ChipProps } from './types/ChipProps'

const BASE_CLASSES =
  'inline-flex items-center gap-1 h-7 pl-[10px] pr-1 rounded-[14px] text-xs font-medium transition-all duration-150'

const TONE_CLASSES = {
  accent: 'bg-accent-bg border border-accent-border text-accent',
  neutral: 'bg-surface border border-border text-text'
} as const

const REMOVE_BTN_CLASSES =
  'w-5 h-5 rounded-full inline-flex items-center justify-center text-sm cursor-pointer ml-0.5 transition-colors duration-150 hover:bg-accent/25'

export function Chip({ label, onRemove, tone = 'accent', className }: ChipProps) {
  const finalClass = [BASE_CLASSES, TONE_CLASSES[tone], className].filter(Boolean).join(' ')
  return (
    <span className={finalClass}>
      {label}
      {onRemove ? (
        <button type="button" className={REMOVE_BTN_CLASSES} onClick={onRemove}>
          ×
        </button>
      ) : null}
    </span>
  )
}
