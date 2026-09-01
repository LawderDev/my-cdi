import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const SECTION_LABEL_FONT_SIZE_PX = 11
export const SECTION_LABEL_FONT_WEIGHT = 600
export const FEEDBACK_AUTO_HIDE_MS = 4000

export const SectionLabel = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: `${SECTION_LABEL_FONT_SIZE_PX}px`,
  fontWeight: SECTION_LABEL_FONT_WEIGHT,
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  color: 'var(--text-dim)',
  marginBottom: theme.spacing(1.25)
}))

export const EntryForm = styled('form', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}))
