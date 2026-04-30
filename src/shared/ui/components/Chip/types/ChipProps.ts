export type ChipTone = 'accent' | 'neutral'

export interface ChipProps {
  label: string
  onRemove?: () => void
  tone?: ChipTone
  className?: string
}
