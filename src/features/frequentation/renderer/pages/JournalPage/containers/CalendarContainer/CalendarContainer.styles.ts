import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import {
  DOW_FONT_SIZE_PX,
  DOW_FONT_WEIGHT
} from './components/CalendarViewPresenter/CalendarViewPresenter.styles'

export const WeekdayLabel = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${DOW_FONT_SIZE_PX}px`,
  fontWeight: DOW_FONT_WEIGHT,
  color: 'var(--text-dim)',
  py: 0.75,
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
})
