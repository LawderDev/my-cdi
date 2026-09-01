import {
  PeriodFilterButton,
  PeriodFilterIcon,
  PeriodFilterRow
} from './PeriodFilterContainer.styles'
import { usePeriodFilter } from './hooks/usePeriodFilter'
import type { PeriodFilterContainerProps } from './types/PeriodFilterContainerProps'

export function PeriodFilterContainer({ value, onChange }: PeriodFilterContainerProps) {
  const periodButtons = usePeriodFilter(value, onChange)

  return (
    <PeriodFilterRow>
      {periodButtons.map((button) => (
        <PeriodFilterButton
          key={button.key}
          type="button"
          disabled={button.disabled}
          data-active={button.isActive}
          onClick={button.onSelect}
        >
          {button.iconName ? <PeriodFilterIcon name={button.iconName} /> : null}
          {button.label}
        </PeriodFilterButton>
      ))}
    </PeriodFilterRow>
  )
}
