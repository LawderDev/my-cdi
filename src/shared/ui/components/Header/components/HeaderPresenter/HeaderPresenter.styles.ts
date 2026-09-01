import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { MONO_FONT_FAMILY } from '@ui/theme'

const HEADER_HEIGHT_PX = 56
const TITLE_FONT_SIZE_PX = 17
const SUBTITLE_FONT_SIZE_PX = 12
const CLOCK_FONT_SIZE_PX = 13
const TITLE_FONT_WEIGHT = 600
const PX_SPACING = 3.5
const GAP_MEDIUM = 2
const GAP_SMALL = 1.5

export const HeaderRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  height: `${HEADER_HEIGHT_PX}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: PX_SPACING,
  borderBottom: '1px solid var(--border)',
  flexShrink: 0,
  bgcolor: 'var(--bg)'
})

export const TitleBlock = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: GAP_MEDIUM
})

export const Title = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${TITLE_FONT_SIZE_PX}px`,
  fontWeight: TITLE_FONT_WEIGHT,
  letterSpacing: '-0.3px',
  color: 'var(--title)'
})

export const Subtitle = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${SUBTITLE_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
})

export const ClockArea = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: GAP_SMALL
})

export const Clock = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: `${CLOCK_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
})
