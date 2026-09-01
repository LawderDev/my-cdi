import Box from '@mui/material/Box'
import { Icon } from '@ui/components/Icon'
import {
  ACTIVE_FONT_WEIGHT,
  BTN_FONT_SIZE_PX,
  BTN_FONT_WEIGHT,
  BTN_HEIGHT_PX,
  ICON_FONT_SIZE_PX
} from './PeriodFilter.styles'
import { usePeriodFilter } from './hooks/usePeriodFilter'
import type { PeriodFilterProps } from './types/PeriodFilterProps'

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  const periodButtons = usePeriodFilter(value, onChange)

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {periodButtons.map((button) => (
        <Box
          component="button"
          key={button.key}
          type="button"
          disabled={button.disabled}
          data-active={button.isActive}
          onClick={button.onSelect}
          sx={{
            height: `${BTN_HEIGHT_PX}px`,
            px: 1.75,
            borderRadius: 'var(--radius-xs)',
            fontSize: `${BTN_FONT_SIZE_PX}px`,
            fontWeight: button.isActive ? ACTIVE_FONT_WEIGHT : BTN_FONT_WEIGHT,
            border: '1px solid',
            borderColor: button.isActive ? 'var(--accent-border)' : 'var(--border)',
            transition: 'all 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            bgcolor: button.isActive ? 'var(--accent-bg)' : 'transparent',
            color: button.isActive ? 'var(--accent)' : 'var(--text-dim)',
            '&:hover': {
              borderColor: button.isActive ? 'var(--accent-border)' : 'var(--border-light)',
              color: button.isActive ? 'var(--accent)' : 'var(--title)'
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
          {button.label}
        </Box>
      ))}
    </Box>
  )
}
