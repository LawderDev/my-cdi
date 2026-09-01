import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import { TITLE_ICON_FONT_SIZE_PX, ChartCardTitle } from './ChartCardPresenter.styles'
import type { ChartCardPresenterProps } from './types/ChartCardPresenterProps'

export function ChartCardPresenter({ titleIcon, title, children }: ChartCardPresenterProps) {
  return (
    <Card>
      <ChartCardTitle>
        <Icon
          name={titleIcon}
          style={{ fontSize: `${TITLE_ICON_FONT_SIZE_PX}px`, color: 'var(--accent)' }}
        />
        {title}
      </ChartCardTitle>
      {children}
    </Card>
  )
}
