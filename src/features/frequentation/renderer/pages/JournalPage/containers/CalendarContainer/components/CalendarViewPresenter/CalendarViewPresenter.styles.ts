import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const TITLE_FONT_SIZE_PX = 15
export const TITLE_FONT_WEIGHT = 600
export const DOW_FONT_SIZE_PX = 11
export const DOW_FONT_WEIGHT = 600
export const WEEK_DAYS_COUNT = 7

export const CalendarHeader = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2)
}))

export const MonthTitle = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${TITLE_FONT_SIZE_PX}px`,
  fontWeight: TITLE_FONT_WEIGHT
})

export const NavGroup = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5)
}))

export const MonthGrid = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${WEEK_DAYS_COUNT}, 1fr)`,
  gap: theme.spacing(0.25),
  textAlign: 'center'
}))
