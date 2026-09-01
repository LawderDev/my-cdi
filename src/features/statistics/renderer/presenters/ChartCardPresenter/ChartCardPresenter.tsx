import { Card } from '@ui/components/Card'
import { ChartCardTitle, ChartCardTitleIcon } from './ChartCardPresenter.styles'
import type { ChartCardPresenterProps } from './types/ChartCardPresenterProps'

export function ChartCardPresenter({ titleIcon, title, children }: ChartCardPresenterProps) {
  return (
    <Card>
      <ChartCardTitle variant="body1">
        <ChartCardTitleIcon name={titleIcon} />
        {title}
      </ChartCardTitle>
      {children}
    </Card>
  )
}
