import type { ActivityTone } from '@ui/theme'
import { ChipDot, ChipRoot } from './ActivityChipPresenter.styles'

interface ActivityChipPresenterProps {
  tone: ActivityTone
  label: string
}

export function ActivityChipPresenter({ tone, label }: ActivityChipPresenterProps) {
  return (
    <ChipRoot variant="caption" $tone={tone} data-tone={tone}>
      <ChipDot $tone={tone} />
      {label}
    </ChipRoot>
  )
}
