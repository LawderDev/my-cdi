import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { MONO_FONT_FAMILY } from '@ui/theme'

export const NAME_FONT_SIZE_PX = 13
export const NAME_FONT_WEIGHT = 500
export const CLASSE_FONT_SIZE_PX = 11
export const CLASSE_FONT_WEIGHT = 500
export const TIME_FONT_SIZE_PX = 11
export const PERIOD_FONT_SIZE_PX = 10
export const PERIOD_FONT_WEIGHT = 600

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
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: 'background-color 0.15s',
  backgroundColor: $isSelected ? 'var(--accent-bg)' : 'transparent',
  marginTop: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: $isSelected ? 'var(--accent-bg)' : 'var(--surface)'
  },
  [`&:hover .${ACTIONS_CLASS}`]: {
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
  fontSize: `${NAME_FONT_SIZE_PX}px`,
  fontWeight: NAME_FONT_WEIGHT,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75)
}))

export const ClasseTag = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: `${CLASSE_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  fontWeight: CLASSE_FONT_WEIGHT,
  marginLeft: theme.spacing(0.5)
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
})({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: `${TIME_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
})

export const PeriodTag = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  fontSize: `${PERIOD_FONT_SIZE_PX}px`,
  fontWeight: PERIOD_FONT_WEIGHT,
  paddingInline: theme.spacing(0.75),
  paddingBlock: '1px',
  borderRadius: 'var(--radius-xs)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}))

export const RowActions = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.25),
  opacity: 0,
  transition: 'opacity 0.15s'
}))
