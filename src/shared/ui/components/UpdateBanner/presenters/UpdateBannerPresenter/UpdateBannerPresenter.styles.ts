import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { RADII, TINT_ALPHAS } from '@ui/theme'

type BannerStatus = 'available' | 'downloading' | 'downloaded' | 'error'

const GAP_BANNER = 1.5
const PADDING_X_STEPS = 2
const PY_SPACING = 1.5
const MT_SPACING = 2
const MX_SPACING = 3.5
const MB_SPACING = 2
const GAP_ACTIONS = 1
const PROGRESS_MARGIN_TOP = 1
const PROGRESS_HEIGHT = '4px'
const BORDER_ALPHA = TINT_ALPHAS.border

export const Banner = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $status: BannerStatus }>(({ theme, $status }) => {
  const accentColor =
    $status === 'downloaded'
      ? theme.palette.success.main
      : $status === 'error'
        ? theme.palette.error.main
        : theme.palette.primary.main
  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(GAP_BANNER),
    paddingInline: theme.spacing(PADDING_X_STEPS),
    paddingBlock: theme.spacing(PY_SPACING),
    marginTop: theme.spacing(MT_SPACING),
    marginInline: theme.spacing(MX_SPACING),
    marginBottom: theme.spacing(MB_SPACING),
    borderRadius: theme.shape.borderRadius,
    border: '1px solid',
    backgroundColor: alpha(accentColor, TINT_ALPHAS.surface),
    color: accentColor,
    borderColor: alpha(accentColor, BORDER_ALPHA)
  }
})

export const ContentText = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  flex: 1,
  fontSize: theme.typography.body1.fontSize
}))

export const ActionsRow = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(GAP_ACTIONS)
}))

export const ProgressBar = styled(LinearProgress, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginTop: theme.spacing(PROGRESS_MARGIN_TOP),
  height: PROGRESS_HEIGHT,
  borderRadius: RADII.small
}))
