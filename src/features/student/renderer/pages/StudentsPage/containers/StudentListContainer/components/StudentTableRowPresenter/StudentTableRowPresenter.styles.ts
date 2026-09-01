import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { MONO_FONT_FAMILY } from '@ui/theme'

export const NUMERIC_FONT_SIZE_PX = 12
export const NUMERIC_FONT_WEIGHT = 600

export const SelectCheckbox = styled(Checkbox, {
  shouldForwardProp: shouldForwardStyledProp
})({
  color: 'var(--border-light)',
  p: 0.5,
  '&.Mui-checked': { color: 'var(--accent)' }
})

export const NameCellContent = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: 1.25
})

export const IneCell = styled('td', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: `${NUMERIC_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
})

export const VisitsCell = styled('td', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: `${NUMERIC_FONT_SIZE_PX}px`,
  fontWeight: NUMERIC_FONT_WEIGHT,
  color: 'var(--text-dim)'
})
