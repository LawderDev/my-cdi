import type { StatDelta } from '@statistics/types'

export interface StatCardProps {
  iconName: string
  iconBgClass: string
  iconColorClass: string
  label: string
  value: string
  delta?: StatDelta
}
