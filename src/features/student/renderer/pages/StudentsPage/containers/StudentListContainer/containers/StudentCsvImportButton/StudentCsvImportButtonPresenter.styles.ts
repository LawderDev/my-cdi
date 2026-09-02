import type { CSSProperties } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { Icon } from '@ui/components/Icon'
import { FONT_WEIGHTS, RADII, TYPE_SCALE } from '@ui/theme'

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
export const TRIGGER_ICON_FONT_SIZE_PX = TYPE_SCALE.subtitle1
export const TRIGGER_ICON_STYLE = { fontSize: TRIGGER_ICON_FONT_SIZE_PX } as const

const DROPZONE_BORDER_WIDTH_PX = 2
const ERROR_LINES_MAX_HEIGHT_PX = 200

export const ResultAlert = styled(Alert, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginBottom: theme.spacing(2)
}))

export const Dropzone = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `${DROPZONE_BORDER_WIDTH_PX}px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(5),
  textAlign: 'center',
  cursor: 'pointer',
  transition: theme.transitions.create('border-color'),
  marginBottom: theme.spacing(2),
  '&:hover': { borderColor: theme.palette.primary.main }
}))

export const DropzoneIcon = styled(Icon)(({ theme }) => ({
  fontSize: TYPE_SCALE.h4,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.disabled
}))

export const DropzoneTitle = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  margin: 0,
  fontWeight: theme.typography.body2.fontWeight,
  color: theme.palette.text.primary
}))

export const DropzoneSubtitle = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.text.disabled
}))

export const SelectedFileName = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  color: theme.palette.text.secondary
}))

export const ErrorLinesPanel = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  backgroundColor: theme.palette.surface,
  borderRadius: RADII.small,
  padding: theme.spacing(1.75),
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.disabled,
  lineHeight: 1.5,
  marginBottom: theme.spacing(2),
  maxHeight: `${ERROR_LINES_MAX_HEIGHT_PX}px`,
  overflowY: 'auto'
}))

export const ErrorLine = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(0.5)
}))

export const ReportActions = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2)
}))

export const HintPanel = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  backgroundColor: theme.palette.surface,
  borderRadius: RADII.small,
  padding: theme.spacing(1.75),
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.disabled,
  lineHeight: 1.5
}))

export const HintTitle = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontWeight: FONT_WEIGHTS.semibold,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5)
}))

export const HintSmall = styled('small', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'block',
  marginTop: theme.spacing(0.5),
  fontSize: theme.typography.body2.fontSize
}))
