const PX_SPACING = 3
const PT_SPACING = 2.5
const PY_BODY_SPACING = 2.5
const PB_FOOTER_SPACING = 2.5
const FONT_WEIGHT_SEMIBOLD = 600
const TITLE_FONT_SIZE = '16px'
const TITLE_PB = 0
const FOOTER_GAP = 1

export const PAPER_SX = {
  backgroundColor: 'var(--card)',
  backgroundImage: 'none',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  boxShadow: 'var(--shadow-lg)'
}

export const TITLE_SX = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  px: PX_SPACING,
  pt: PT_SPACING,
  pb: TITLE_PB,
  fontSize: TITLE_FONT_SIZE,
  fontWeight: FONT_WEIGHT_SEMIBOLD
}

export const BODY_SX = { px: PX_SPACING, py: PY_BODY_SPACING }

export const FOOTER_SX = { px: PX_SPACING, pb: PB_FOOTER_SPACING, gap: FOOTER_GAP }
