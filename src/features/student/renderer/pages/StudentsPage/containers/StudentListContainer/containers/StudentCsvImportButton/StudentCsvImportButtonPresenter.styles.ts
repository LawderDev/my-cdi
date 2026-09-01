import type { CSSProperties } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

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
export const DROPZONE_ICON_MARGIN_BOTTOM_PX = 8

export const DROPZONE_PADDING_PX = 40
export const DROPZONE_TITLE_FONT_SIZE_PX = 13
export const DROPZONE_TITLE_FONT_WEIGHT = 500
export const DROPZONE_SUBTITLE_FONT_SIZE_PX = 12
export const HINT_TITLE_FONT_WEIGHT = 600
export const HINT_FONT_SIZE_PX = 12
export const SELECTED_FILE_FONT_SIZE_PX = 12
export const SELECTED_FILE_FONT_WEIGHT = 500
export const ERROR_LINES_MAX_HEIGHT_PX = 200

export const ResultAlert = styled(Alert, {
  shouldForwardProp: shouldForwardStyledProp
})({
  mb: 2
})

export const Dropzone = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px dashed var(--border)',
  borderRadius: 'var(--radius)',
  padding: `${DROPZONE_PADDING_PX}px`,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
  mb: 2,
  '&:hover': { borderColor: 'var(--accent)' }
})

export const DropzoneTitle = styled('p', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${DROPZONE_TITLE_FONT_SIZE_PX}px`,
  fontWeight: DROPZONE_TITLE_FONT_WEIGHT,
  mb: 0.5,
  m: 0
})

export const DropzoneSubtitle = styled('small', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${DROPZONE_SUBTITLE_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
})

export const SelectedFileName = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  mt: 1.5,
  fontSize: `${SELECTED_FILE_FONT_SIZE_PX}px`,
  color: 'var(--text)',
  fontWeight: SELECTED_FILE_FONT_WEIGHT
})

export const ErrorLinesPanel = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  bgcolor: 'var(--surface)',
  borderRadius: 'var(--radius-sm)',
  p: 1.75,
  fontSize: `${HINT_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  lineHeight: 1.5,
  mb: 2,
  maxHeight: `${ERROR_LINES_MAX_HEIGHT_PX}px`,
  overflowY: 'auto'
})

export const ErrorLine = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  color: 'var(--danger)',
  mb: 0.5
})

export const HintPanel = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  bgcolor: 'var(--surface)',
  borderRadius: 'var(--radius-sm)',
  p: 1.75,
  fontSize: `${HINT_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  lineHeight: 1.5
})

export const HintTitle = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontWeight: HINT_TITLE_FONT_WEIGHT,
  color: 'var(--text)',
  mb: 0.5
})

export const HintSmall = styled('small', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'block',
  mt: 0.5,
  fontSize: `${HINT_FONT_SIZE_PX}px`
})
