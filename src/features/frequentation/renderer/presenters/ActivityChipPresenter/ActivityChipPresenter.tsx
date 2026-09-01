import { ChipDot, ChipRoot } from './ActivityChipPresenter.styles'

interface ActivityChipPresenterProps {
  cssClass: string
  label: string
}

export function ActivityChipPresenter({ cssClass, label }: ActivityChipPresenterProps) {
  return (
    <ChipRoot className={cssClass}>
      <ChipDot className="act-dot" />
      {label}
    </ChipRoot>
  )
}
