import type { CSSProperties } from 'react'

export const VISUALLY_HIDDEN_STYLE: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0
}
export const TRIGGER_ICON_FONT_SIZE_PX = 16
export const TRIGGER_ICON_STYLE = { fontSize: TRIGGER_ICON_FONT_SIZE_PX } as const
export const DROPZONE_ICON_FONT_SIZE_PX = 40
export const DROPZONE_ICON_STYLE = { fontSize: DROPZONE_ICON_FONT_SIZE_PX } as const

export const DROPZONE_PADDING_PX = 40
export const DROPZONE_TITLE_FONT_SIZE_PX = 13
export const DROPZONE_TITLE_FONT_WEIGHT = 500
export const DROPZONE_SUBTITLE_FONT_SIZE_PX = 12
export const HINT_TITLE_FONT_WEIGHT = 600
export const HINT_FONT_SIZE_PX = 12
export const SELECTED_FILE_FONT_SIZE_PX = 12
export const SELECTED_FILE_FONT_WEIGHT = 500
