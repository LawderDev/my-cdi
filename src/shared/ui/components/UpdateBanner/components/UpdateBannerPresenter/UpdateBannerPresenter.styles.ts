import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

type BannerStatus = 'available' | 'downloading' | 'downloaded' | 'error'

const GAP_BANNER = 1.5
const PX_SPACING = 2
const PY_SPACING = 1.5
const MT_SPACING = 2
const MX_SPACING = 3.5
const MB_SPACING = 2
const GAP_ACTIONS = 1
const CONTENT_FONT_SIZE = '13px'
const PROGRESS_MARGIN_TOP = 1
const PROGRESS_HEIGHT = '4px'

const BG_BY_STATUS: Record<BannerStatus, string> = {
  available: 'var(--accent-bg)',
  downloading: 'var(--accent-bg)',
  downloaded: 'var(--success-bg)',
  error: 'var(--danger-bg)'
}

const COLOR_BY_STATUS: Record<BannerStatus, string> = {
  available: 'var(--accent)',
  downloading: 'var(--accent)',
  downloaded: 'var(--success)',
  error: 'var(--danger)'
}

const BORDER_BY_STATUS: Record<BannerStatus, string> = {
  available: 'var(--accent-border)',
  downloading: 'var(--accent-border)',
  downloaded: 'rgba(74, 222, 128, 0.25)',
  error: 'rgba(248, 113, 113, 0.25)'
}

export const Banner = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $status: BannerStatus }>(({ $status }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: GAP_BANNER,
  px: PX_SPACING,
  py: PY_SPACING,
  mt: MT_SPACING,
  mx: MX_SPACING,
  mb: MB_SPACING,
  borderRadius: 'var(--radius-sm)',
  border: '1px solid',
  backgroundColor: BG_BY_STATUS[$status],
  color: COLOR_BY_STATUS[$status],
  borderColor: BORDER_BY_STATUS[$status]
}))

export const ContentText = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  flex: 1,
  fontSize: CONTENT_FONT_SIZE
})

export const ActionsRow = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: GAP_ACTIONS
})

export const ProgressBar = styled(LinearProgress, {
  shouldForwardProp: shouldForwardStyledProp
})({
  mt: PROGRESS_MARGIN_TOP,
  height: PROGRESS_HEIGHT,
  borderRadius: 'var(--radius-xs)'
})
