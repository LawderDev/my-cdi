import Box from '@mui/material/Box'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { theme, TINT_ALPHAS } from '@ui/theme'

/** Extra tint step for the info KPI, slightly stronger than the shared surface tint. */
const INFO_TINT_ALPHA = 0.12

export const ACCENT_BG = alpha(theme.palette.primary.main, TINT_ALPHAS.surface)
export const ACCENT_COLOR = theme.palette.primary.main
export const SUCCESS_BG = alpha(theme.palette.success.main, TINT_ALPHAS.surface)
export const SUCCESS_COLOR = theme.palette.success.main
export const WARNING_BG = alpha(theme.palette.warning.main, TINT_ALPHAS.surface)
export const WARNING_COLOR = theme.palette.warning.main
export const INFO_BG = alpha(theme.palette.info.main, INFO_TINT_ALPHA)
export const INFO_COLOR = theme.palette.info.main

export const StatsKpiGrid = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(2),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
}))
