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
})<{ $isSelected: boolean }>(({ $isSelected }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 1.5,
  py: 1.25,
  borderRadius: 'var(--radius-sm)',
  cursor: 'pointer',
  transition: 'background-color 0.15s',
  bgcolor: $isSelected ? 'var(--accent-bg)' : 'transparent',
  mt: 0.5,
  '&:hover': {
    bgcolor: $isSelected ? 'var(--accent-bg)' : 'var(--surface)'
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
})({
  fontSize: `${NAME_FONT_SIZE_PX}px`,
  fontWeight: NAME_FONT_WEIGHT,
  display: 'flex',
  alignItems: 'center',
  gap: 0.75
})

export const ClasseTag = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${CLASSE_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)',
  fontWeight: CLASSE_FONT_WEIGHT,
  ml: 0.5
})

export const MetaRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mt: 0.25
})

export const TimeText = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontFamily: MONO_FONT_FAMILY,
  fontSize: `${TIME_FONT_SIZE_PX}px`,
  color: 'var(--text-dim)'
})

export const PeriodTag = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${PERIOD_FONT_SIZE_PX}px`,
  fontWeight: PERIOD_FONT_WEIGHT,
  px: 0.75,
  py: '1px',
  borderRadius: 'var(--radius-xs)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
})

export const RowActions = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  gap: 0.25,
  opacity: 0,
  transition: 'opacity 0.15s'
})
