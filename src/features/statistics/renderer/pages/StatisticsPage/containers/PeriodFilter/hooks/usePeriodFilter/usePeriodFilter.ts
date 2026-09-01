import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { PeriodKey } from '@statistics/types'

interface PeriodButtonConfig {
  key: PeriodKey
  labelKey: string
  iconName?: string
  disabled?: boolean
}

const BUTTONS: PeriodButtonConfig[] = [
  { key: 'week', labelKey: 'period.week' },
  { key: 'month', labelKey: 'period.month' },
  { key: 'quarter', labelKey: 'period.quarter' },
  { key: 'semester', labelKey: 'period.semester' },
  { key: 'year', labelKey: 'period.year' },
  { key: 'custom', labelKey: 'period.custom', iconName: 'date_range', disabled: true }
]

export interface PeriodButtonViewModel {
  key: PeriodKey
  label: string
  iconName?: string
  disabled?: boolean
  isActive: boolean
  onSelect: () => void
}

export function usePeriodFilter(
  value: PeriodKey,
  onChange: (key: PeriodKey) => void
): PeriodButtonViewModel[] {
  const { t } = useTranslation('statistics')
  const selectButton = useCallback(
    (button: PeriodButtonConfig) => {
      return () => {
        if (!button.disabled) {
          onChange(button.key)
        }
      }
    },
    [onChange]
  )
  return BUTTONS.map((button) => ({
    key: button.key,
    label: t(button.labelKey),
    iconName: button.iconName,
    disabled: button.disabled,
    isActive: button.key === value,
    onSelect: selectButton(button)
  }))
}
