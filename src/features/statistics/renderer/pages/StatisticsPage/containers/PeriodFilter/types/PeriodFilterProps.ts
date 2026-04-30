import type { PeriodKey } from '@statistics/types'

export interface PeriodFilterProps {
  value: PeriodKey
  onChange: (next: PeriodKey) => void
}
