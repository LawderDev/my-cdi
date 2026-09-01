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

export const BASE_BANNER_SX = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: GAP_BANNER,
  px: PX_SPACING,
  py: PY_SPACING,
  mt: MT_SPACING,
  mx: MX_SPACING,
  mb: MB_SPACING,
  borderRadius: 'var(--radius-sm)',
  border: '1px solid'
}

export const INFO_SX = {
  backgroundColor: 'var(--accent-bg)',
  color: 'var(--accent)',
  borderColor: 'var(--accent-border)'
}

export const SUCCESS_SX = {
  backgroundColor: 'var(--success-bg)',
  color: 'var(--success)',
  borderColor: 'rgba(74, 222, 128, 0.25)'
}

export const ERROR_SX = {
  backgroundColor: 'var(--danger-bg)',
  color: 'var(--danger)',
  borderColor: 'rgba(248, 113, 113, 0.25)'
}

export const CONTENT_SX = { flex: 1, fontSize: CONTENT_FONT_SIZE }

export const ACTIONS_SX = { display: 'flex', alignItems: 'center', gap: GAP_ACTIONS }

export const PROGRESS_SX = {
  mt: PROGRESS_MARGIN_TOP,
  height: PROGRESS_HEIGHT,
  borderRadius: 'var(--radius-xs)'
}
