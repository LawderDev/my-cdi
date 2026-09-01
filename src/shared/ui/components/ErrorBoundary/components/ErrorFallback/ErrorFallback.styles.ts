import { MONO_FONT_FAMILY } from '@ui/theme'

const CARD_MAX_WIDTH_PX = 600
const ICON_FONT_SIZE_PX = 48
const FONT_WEIGHT_SEMIBOLD = 600
const TITLE_FONT_SIZE = '20px'
const PAGE_MIN_HEIGHT = '60vh'
const PAGE_PADDING = 3
const GAP_SMALL = 1.5
const MB_MEDIUM = 2
const MB_LARGE = 2.5
const DETAILS_FONT_SIZE = '12px'
const PRE_MARGIN_TOP = 0.5

export const PAGE_SX = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: PAGE_MIN_HEIGHT,
  p: PAGE_PADDING
}

export const CARD_SX = { maxWidth: `${CARD_MAX_WIDTH_PX}px`, width: '100%' }

export const TITLE_ROW_SX = { display: 'flex', alignItems: 'center', gap: GAP_SMALL, mb: MB_MEDIUM }

export const ICON_STYLE = { color: 'var(--danger)', fontSize: `${ICON_FONT_SIZE_PX}px` }

export const HEADING_SX = { fontSize: TITLE_FONT_SIZE, fontWeight: FONT_WEIGHT_SEMIBOLD }

export const DESCRIPTION_SX = { color: 'var(--text)', mb: MB_LARGE }

export const DETAILS_SX = {
  mb: MB_LARGE,
  fontFamily: MONO_FONT_FAMILY,
  fontSize: DETAILS_FONT_SIZE,
  color: 'var(--text-dim)'
}

export const PRE_SX = { whiteSpace: 'pre-wrap', mt: PRE_MARGIN_TOP }
