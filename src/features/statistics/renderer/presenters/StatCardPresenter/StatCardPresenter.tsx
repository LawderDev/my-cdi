import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import {
  StatCardDelta,
  StatCardIcon,
  StatCardLabel,
  StatCardValue
} from './StatCardPresenter.styles'
import type { StatCardPresenterProps } from './types/StatCardPresenterProps'

export function StatCardPresenter({
  iconName,
  iconBg,
  iconColor,
  label,
  value,
  delta
}: StatCardPresenterProps) {
  return (
    <Card>
      <StatCardIcon $bg={iconBg} $color={iconColor}>
        <Icon name={iconName} />
      </StatCardIcon>
      <StatCardLabel variant="overline">{label}</StatCardLabel>
      <StatCardValue variant="h4">{value}</StatCardValue>
      {delta ? (
        <StatCardDelta variant="body2" data-sign={delta.sign}>
          {delta.text}
        </StatCardDelta>
      ) : null}
    </Card>
  )
}
