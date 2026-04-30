import Box from '@mui/material/Box'
import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import { MONO_FONT_FAMILY } from '@ui/theme'
import type { StatCardProps } from './types/StatCardProps'

const ICON_SIZE_PX = 40
const ICON_FONT_SIZE_PX = 20
const LABEL_FONT_SIZE_PX = 11
const LABEL_FONT_WEIGHT = 600
const VALUE_FONT_SIZE_PX = 28
const VALUE_FONT_WEIGHT = 700
const DELTA_FONT_SIZE_PX = 12
const DELTA_FONT_WEIGHT = 500

export function StatCard({ iconName, iconBg, iconColor, label, value, delta }: StatCardProps) {
  const deltaColor = delta?.sign === 'up' ? 'var(--success)' : 'var(--danger)'
  return (
    <Card>
      <Box
        sx={{
          width: `${ICON_SIZE_PX}px`,
          height: `${ICON_SIZE_PX}px`,
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
          fontSize: `${ICON_FONT_SIZE_PX}px`,
          flexShrink: 0,
          bgcolor: iconBg,
          color: iconColor
        }}
      >
        <Icon name={iconName} />
      </Box>
      <Box
        sx={{
          fontSize: `${LABEL_FONT_SIZE_PX}px`,
          fontWeight: LABEL_FONT_WEIGHT,
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          mb: 1
        }}
      >
        {label}
      </Box>
      <Box
        sx={{
          fontFamily: MONO_FONT_FAMILY,
          fontSize: `${VALUE_FONT_SIZE_PX}px`,
          fontWeight: VALUE_FONT_WEIGHT,
          letterSpacing: '-1px',
          lineHeight: 1
        }}
      >
        {value}
      </Box>
      {delta ? (
        <Box
          data-sign={delta.sign}
          sx={{
            fontSize: `${DELTA_FONT_SIZE_PX}px`,
            mt: 0.75,
            fontWeight: DELTA_FONT_WEIGHT,
            color: deltaColor
          }}
        >
          {delta.text}
        </Box>
      ) : null}
    </Card>
  )
}
