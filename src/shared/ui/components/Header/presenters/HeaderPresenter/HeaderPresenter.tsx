import Box from '@mui/material/Box'
import type { HeaderPresenterProps } from './types/HeaderPresenterProps'
import { Clock, ClockArea, HeaderRoot, Subtitle, Title, TitleBlock } from './HeaderPresenter.styles'

export function HeaderPresenter({ title, subtitle, time }: HeaderPresenterProps) {
  return (
    <HeaderRoot as="header">
      <TitleBlock>
        <Box>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Box>
      </TitleBlock>
      <ClockArea>
        <Clock>{time}</Clock>
      </ClockArea>
    </HeaderRoot>
  )
}
