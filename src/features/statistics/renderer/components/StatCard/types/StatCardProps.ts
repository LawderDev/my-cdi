import type { StatDelta } from '@statistics/types'

export interface StatCardProps {
  iconName: string
  iconBg: string
  iconColor: string
  label: string
  value: string
  delta?: StatDelta
}
