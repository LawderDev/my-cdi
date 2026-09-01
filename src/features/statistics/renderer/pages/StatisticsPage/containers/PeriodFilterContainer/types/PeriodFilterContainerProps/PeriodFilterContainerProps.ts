import type { PeriodKey } from '@statistics/types'

export interface PeriodFilterContainerProps {
  value: PeriodKey
  onChange: (next: PeriodKey) => void
}
