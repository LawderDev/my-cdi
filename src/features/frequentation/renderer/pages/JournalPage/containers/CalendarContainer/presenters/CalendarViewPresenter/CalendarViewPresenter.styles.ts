import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const WEEK_DAYS_COUNT = 7

export const CalendarHeader = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2)
}))

export const MonthTitle = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})({
  margin: 0
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
