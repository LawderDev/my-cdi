import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const LABEL_FONT_SIZE_PX = 11
export const LABEL_FONT_WEIGHT = 600
export const LOADING_FONT_SIZE_PX = 12
export const CHIPS_MIN_HEIGHT_PX = 28

export const FieldLabel = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'block',
  fontSize: `${LABEL_FONT_SIZE_PX}px`,
  fontWeight: LABEL_FONT_WEIGHT,
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  color: 'var(--text-dim)',
  mb: 0.75
})

export const LoadingText = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${LOADING_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  mb: 1
})

export const ChipsRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 0.75,
  minHeight: `${CHIPS_MIN_HEIGHT_PX}px`,
  mt: 1
})
