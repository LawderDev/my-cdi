import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const NAME_FONT_SIZE_PX = 13
export const CLASSE_FONT_SIZE_PX = 11
export const NAME_FONT_WEIGHT = 500

export const EntrySummary = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
  mb: 2,
  p: 1.25,
  bgcolor: 'var(--surface)',
  borderRadius: 'var(--radius-sm)'
})

export const StudentName = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontWeight: NAME_FONT_WEIGHT,
  fontSize: `${NAME_FONT_SIZE_PX}px`
})

export const StudentClasse = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${CLASSE_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
})
