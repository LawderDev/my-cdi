const ICON_FONT_SIZE_PX = 48
const ICON_OPACITY = 0.4
const PY_SPACING = 7.5
const PX_SPACING = 2.5
const MESSAGE_MB_SPACING = 0.5
const DESCRIPTION_OPACITY = 0.7
const ICON_MARGIN_BOTTOM = '12px'
const MESSAGE_FONT_SIZE = '14px'
const DESCRIPTION_FONT_SIZE = '12px'

export const CONTAINER_SX = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'var(--text-dim)',
  py: PY_SPACING,
  px: PX_SPACING
}

export const ICON_STYLE = {
  fontSize: `${ICON_FONT_SIZE_PX}px`,
  marginBottom: ICON_MARGIN_BOTTOM,
  opacity: ICON_OPACITY
}

export const MESSAGE_SX = { fontSize: MESSAGE_FONT_SIZE, mb: MESSAGE_MB_SPACING }

export const DESCRIPTION_SX = { fontSize: DESCRIPTION_FONT_SIZE, opacity: DESCRIPTION_OPACITY }
