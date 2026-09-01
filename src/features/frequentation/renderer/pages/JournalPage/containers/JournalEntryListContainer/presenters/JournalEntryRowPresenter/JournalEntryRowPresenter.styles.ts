import Typography from '@mui/material/Typography'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, MONO_FONT_FAMILY, RADII, TINT_ALPHAS } from '@ui/theme'

export const ACTIONS_CLASS = 'att-actions'

export const Row = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $isSelected: boolean }>(({ theme, $isSelected }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  paddingInline: theme.spacing(1.5),
  paddingBlock: theme.spacing(1.25),
  borderRadius: RADII.small,
  cursor: 'pointer',
  transition: theme.transitions.create('background-color'),
  backgroundColor: $isSelected
    ? alpha(theme.palette.primary.main, TINT_ALPHAS.surface)
    : 'transparent',
  marginTop: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: $isSelected
      ? alpha(theme.palette.primary.main, TINT_ALPHAS.surface)
      : theme.palette.surface
  },
  [`&:hover .${ACTIONS_CLASS}`]: {
    opacity: 1
  },
  [`&:focus-within .${ACTIONS_CLASS}`]: {
    opacity: 1
  }
}))

export const RowMain = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  flex: 1,
  minWidth: 0
})

export const StudentName = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  fontSize: theme.typography.body1.fontSize,
  fontWeight: FONT_WEIGHTS.medium,
  color: theme.palette.text.primary
}))

export const ClasseTag = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  fontWeight: FONT_WEIGHTS.medium,
  marginLeft: theme.spacing(0.5),
  color: theme.palette.text.disabled
}))

export const MetaRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.25)
}))

export const TimeText = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.disabled
}))

export const PeriodTag = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $period: 'morning' | 'afternoon' }>(({ theme, $period }) => {
  const periodColor = $period === 'morning' ? theme.palette.warning.main : theme.palette.info.main
  return {
    paddingInline: theme.spacing(0.75),
    paddingBlock: theme.spacing(0.25),
    borderRadius: RADII.small,
    backgroundColor: alpha(periodColor, TINT_ALPHAS.surface),
    color: periodColor
  }
})

export const RowActions = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.25),
  opacity: 0,
  transition: theme.transitions.create('opacity')
}))
