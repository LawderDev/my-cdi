import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const SECTION_LABEL_FONT_SIZE_PX = 11
export const SECTION_LABEL_FONT_WEIGHT = 600
export const FEEDBACK_AUTO_HIDE_MS = 4000

export const SectionLabel = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${SECTION_LABEL_FONT_SIZE_PX}px`,
  fontWeight: SECTION_LABEL_FONT_WEIGHT,
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  color: 'var(--text-dim)',
  mb: 1.25
})

export const EntryForm = styled('form', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexDirection: 'column',
  gap: 2
})
