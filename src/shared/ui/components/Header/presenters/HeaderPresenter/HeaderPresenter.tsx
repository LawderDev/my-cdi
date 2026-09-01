import Box from '@mui/material/Box'
import type { HeaderPresenterProps } from './types/HeaderPresenterProps'
import { Clock, ClockArea, HeaderRoot, Subtitle, Title, TitleBlock } from './HeaderPresenter.styles'

export function HeaderPresenter({ title, subtitle, time }: HeaderPresenterProps) {
  return (
    <HeaderRoot as="header">
      <TitleBlock>
        <Box>
          <Title variant="h6">{title}</Title>
          <Subtitle variant="body2">{subtitle}</Subtitle>
        </Box>
      </TitleBlock>
      <ClockArea>
        <Clock>{time}</Clock>
      </ClockArea>
    </HeaderRoot>
  )
}
