import { MONO_FONT_FAMILY } from '@ui/theme'

const HEADER_HEIGHT_PX = 56
const TITLE_FONT_SIZE_PX = 17
const SUBTITLE_FONT_SIZE_PX = 12
const CLOCK_FONT_SIZE_PX = 13
const TITLE_FONT_WEIGHT = 600
const PX_SPACING = 3.5
const GAP_MEDIUM = 2
const GAP_SMALL = 1.5

export const HEADER_SX = {
  height: `${HEADER_HEIGHT_PX}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: PX_SPACING,
  borderBottom: '1px solid var(--border)',
  flexShrink: 0,
  bgcolor: 'var(--bg)'
}

export const TITLE_BLOCK_SX = { display: 'flex', alignItems: 'center', gap: GAP_MEDIUM }

export const TITLE_SX = {
  fontSize: `${TITLE_FONT_SIZE_PX}px`,
  fontWeight: TITLE_FONT_WEIGHT,
  letterSpacing: '-0.3px',
  color: 'var(--title)'
}

export const SUBTITLE_SX = { fontSize: `${SUBTITLE_FONT_SIZE_PX}px`, color: 'var(--text-dim)' }

export const CLOCK_AREA_SX = { display: 'flex', alignItems: 'center', gap: GAP_SMALL }

export const CLOCK_SX = {
  fontFamily: MONO_FONT_FAMILY,
  fontSize: `${CLOCK_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
}
