import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import type { ChartCardProps } from './types/ChartCardProps'

const TITLE_CLASSES = 'text-sm font-semibold mb-4 flex items-center gap-2'
const TITLE_ICON_CLASSES = 'text-[18px] text-accent'

export function ChartCard({ titleIcon, title, children }: ChartCardProps) {
  return (
    <Card>
      <div className={TITLE_CLASSES}>
        <Icon name={titleIcon} className={TITLE_ICON_CLASSES} />
        {title}
      </div>
      {children}
    </Card>
  )
}
