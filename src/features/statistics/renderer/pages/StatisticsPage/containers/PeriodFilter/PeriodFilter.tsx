import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
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

const BTN_HEIGHT_PX = 32
const BTN_FONT_SIZE_PX = 12
const BTN_FONT_WEIGHT = 500
const ACTIVE_FONT_WEIGHT = 600
const ICON_FONT_SIZE_PX = 14

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  const { t } = useTranslation('statistics')

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {BUTTONS.map((button) => {
        const isActive = button.key === value
        return (
          <Box
            component="button"
            key={button.key}
            type="button"
            disabled={button.disabled}
            data-active={isActive}
            onClick={() => {
              if (!button.disabled) {
                onChange(button.key)
              }
            }}
            sx={{
              height: `${BTN_HEIGHT_PX}px`,
              px: 1.75,
              borderRadius: 'var(--radius-xs)',
              fontSize: `${BTN_FONT_SIZE_PX}px`,
              fontWeight: isActive ? ACTIVE_FONT_WEIGHT : BTN_FONT_WEIGHT,
              border: '1px solid',
              borderColor: isActive ? 'var(--accent-border)' : 'var(--border)',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              bgcolor: isActive ? 'var(--accent-bg)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-dim)',
              '&:hover': {
                borderColor: isActive ? 'var(--accent-border)' : 'var(--border-light)',
                color: isActive ? 'var(--accent)' : 'var(--title)'
              },
              '&:disabled': {
                opacity: 0.5,
                cursor: 'not-allowed'
              }
            }}
          >
            {button.iconName ? (
              <Icon name={button.iconName} style={{ fontSize: `${ICON_FONT_SIZE_PX}px` }} />
            ) : null}
            {t(button.labelKey)}
          </Box>
        )
      })}
    </Box>
  )
}
