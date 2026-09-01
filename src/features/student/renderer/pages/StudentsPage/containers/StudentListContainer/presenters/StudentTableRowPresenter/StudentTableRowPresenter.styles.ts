import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, MONO_FONT_FAMILY, RADII } from '@ui/theme'

export const SelectCheckbox = styled(Checkbox, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  color: theme.palette.dividerStrong,
  padding: theme.spacing(0.5),
  '&.Mui-checked': { color: theme.palette.primary.main }
}))

export const NameCellContent = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.25)
}))

export const NameText = styled('span')({
  fontWeight: FONT_WEIGHTS.medium
})

export const ClassTag = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'inline-flex',
  paddingInline: theme.spacing(1.25),
  paddingBlock: theme.spacing(0.25),
  backgroundColor: theme.palette.surface,
  borderRadius: RADII.small,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: FONT_WEIGHTS.medium,
  color: theme.palette.text.secondary
}))

export const IneCell = styled('td', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.disabled
}))

export const VisitsCell = styled('td', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: FONT_WEIGHTS.semibold,
  color: theme.palette.text.disabled
}))

export const RowActions = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  opacity: 0,
  transition: theme.transitions.create('opacity'),
  'tr:hover &': {
    opacity: 1
  },
  'tr:focus-within &': {
    opacity: 1
  }
}))
