import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const RESPONSIVE_BREAKPOINT_PX = 1100
export const ACCENT_BG = 'var(--accent-bg)'
export const ACCENT_COLOR = 'var(--accent)'
export const SUCCESS_BG = 'var(--success-bg)'
export const SUCCESS_COLOR = 'var(--success)'
export const WARNING_BG = 'var(--warning-bg)'
export const WARNING_COLOR = 'var(--warning)'
export const INFO_BG = 'rgba(96,165,250,0.12)'
export const INFO_COLOR = '#60a5fa'

export const StatsKpiGrid = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 2,
  [`@media (max-width: ${RESPONSIVE_BREAKPOINT_PX}px)`]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
})
