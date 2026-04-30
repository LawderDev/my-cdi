import { useTranslation } from 'react-i18next'
import { Icon } from '@ui/components/Icon'
import type { PeriodKey } from '@statistics/types'
import type { PeriodFilterProps } from './types/PeriodFilterProps'

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

const WRAPPER_CLASSES = 'flex gap-2 flex-wrap'
const BTN_BASE =
  'h-8 px-3.5 rounded-xs text-xs font-medium border transition-all inline-flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed'
const BTN_INACTIVE = 'border-border text-text-dim hover:border-border-light hover:text-title'
const BTN_ACTIVE = 'bg-accent-bg border-accent-border text-accent font-semibold'
const ICON_CLASSES = 'text-[14px]'

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  const { t } = useTranslation('statistics')
  return (
    <div className={WRAPPER_CLASSES}>
      {BUTTONS.map((button) => {
        const isActive = button.key === value
        const className = `${BTN_BASE} ${isActive ? BTN_ACTIVE : BTN_INACTIVE}`
        return (
          <button
            key={button.key}
            type="button"
            disabled={button.disabled}
            className={className}
            onClick={() => {
              if (!button.disabled) {
                onChange(button.key)
              }
            }}
          >
            {button.iconName ? <Icon name={button.iconName} className={ICON_CLASSES} /> : null}
            {t(button.labelKey)}
          </button>
        )
      })}
    </div>
  )
}
