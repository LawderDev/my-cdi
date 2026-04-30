import Box from '@mui/material/Box'
import { MONO_FONT_FAMILY } from '@ui/theme'
import type { HeaderViewProps } from './types/HeaderViewProps'

const HEADER_HEIGHT_PX = 56
const TITLE_FONT_SIZE_PX = 17
const SUBTITLE_FONT_SIZE_PX = 12
const CLOCK_FONT_SIZE_PX = 13
const TITLE_FONT_WEIGHT = 600

export function HeaderView({ title, subtitle, time }: HeaderViewProps) {
  return (
    <Box
      component="header"
      sx={{
        height: `${HEADER_HEIGHT_PX}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3.5,
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        bgcolor: 'var(--bg)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box>
          <Box
            sx={{
              fontSize: `${TITLE_FONT_SIZE_PX}px`,
              fontWeight: TITLE_FONT_WEIGHT,
              letterSpacing: '-0.3px',
              color: 'var(--title)'
            }}
          >
            {title}
          </Box>
          <Box sx={{ fontSize: `${SUBTITLE_FONT_SIZE_PX}px`, color: 'var(--text-dim)' }}>
            {subtitle}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            fontFamily: MONO_FONT_FAMILY,
            fontSize: `${CLOCK_FONT_SIZE_PX}px`,
            color: 'var(--text-dim)'
          }}
        >
          {time}
        </Box>
      </Box>
    </Box>
  )
}
