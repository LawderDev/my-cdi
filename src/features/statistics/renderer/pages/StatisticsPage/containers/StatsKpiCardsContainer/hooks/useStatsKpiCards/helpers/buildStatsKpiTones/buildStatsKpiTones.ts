import { alpha, type Palette } from '@mui/material/styles'
import { TINT_ALPHAS } from '@ui/theme'

/** Extra tint step for the info KPI, slightly stronger than the shared surface tint. */
const INFO_TINT_ALPHA = 0.12

export interface KpiTones {
  accentBg: string
  accentColor: string
  successBg: string
  successColor: string
  warningBg: string
  warningColor: string
  infoBg: string
  infoColor: string
}

export function buildStatsKpiTones(palette: Palette): KpiTones {
  return {
    accentBg: alpha(palette.primary.main, TINT_ALPHAS.surface),
    accentColor: palette.primary.main,
    successBg: alpha(palette.success.main, TINT_ALPHAS.surface),
    successColor: palette.success.main,
    warningBg: alpha(palette.warning.main, TINT_ALPHAS.surface),
    warningColor: palette.warning.main,
    infoBg: alpha(palette.info.main, INFO_TINT_ALPHA),
    infoColor: palette.info.main
  }
}