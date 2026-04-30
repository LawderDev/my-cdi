export type PeriodKey = 'week' | 'month' | 'quarter' | 'semester' | 'year' | 'custom'

export interface PeriodOption {
  value: PeriodKey
  label: string
  iconName?: string
}

export interface StatDelta {
  sign: 'up' | 'down'
  text: string
}
