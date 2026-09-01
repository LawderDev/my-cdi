import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const LABEL_FONT_SIZE_PX = 11
export const LABEL_FONT_WEIGHT = 600
export const LOADING_FONT_SIZE_PX = 12
export const CHIPS_MIN_HEIGHT_PX = 28

export const FieldLabel = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'block',
  fontSize: `${LABEL_FONT_SIZE_PX}px`,
  fontWeight: LABEL_FONT_WEIGHT,
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  color: 'var(--text-dim)',
  marginBottom: theme.spacing(0.75)
}))

export const LoadingText = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: `${LOADING_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  marginBottom: theme.spacing(1)
}))

export const ChipsRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
  minHeight: `${CHIPS_MIN_HEIGHT_PX}px`,
  marginTop: theme.spacing(1)
}))
