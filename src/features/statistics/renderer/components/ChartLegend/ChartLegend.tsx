import Box from '@mui/material/Box'
import { MONO_FONT_FAMILY } from '@ui/theme'
import type { ChartLegendProps } from './types/ChartLegendProps'

const ITEM_FONT_SIZE_PX = 12
const VALUE_FONT_SIZE_PX = 12
const VALUE_FONT_WEIGHT = 600
const DOT_SIZE_PX = 8
const DOT_BORDER_RADIUS_PX = 2

export function ChartLegend({ items }: ChartLegendProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {items.map((item) => (
        <Box
          key={item.label}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: `${ITEM_FONT_SIZE_PX}px`
          }}
        >
          <Box
            component="span"
            sx={{
              width: `${DOT_SIZE_PX}px`,
              height: `${DOT_SIZE_PX}px`,
              borderRadius: `${DOT_BORDER_RADIUS_PX}px`,
              flexShrink: 0,
              background: item.color
            }}
          />
          <Box component="span" sx={{ color: 'var(--text)', flex: 1 }}>
            {item.label}
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: MONO_FONT_FAMILY,
              fontWeight: VALUE_FONT_WEIGHT,
              color: 'var(--title)',
              fontSize: `${VALUE_FONT_SIZE_PX}px`
            }}
          >
            {item.value}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
