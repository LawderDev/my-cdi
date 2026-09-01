import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const NAME_FONT_SIZE_PX = 13
export const CLASSE_FONT_SIZE_PX = 11
export const NAME_FONT_WEIGHT = 500

export const EntrySummary = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.25),
  backgroundColor: 'var(--surface)',
  borderRadius: 'var(--radius-sm)'
}))

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
