import { Card } from '@ui/components/Card'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const ListCard = styled(Card, {
  shouldForwardProp: shouldForwardStyledProp
})({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  overflow: 'hidden'
})

export const EntriesScroll = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(1)
}))
