import { useTranslation } from 'react-i18next'
import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'

const WRAPPER_CLASSES = 'flex justify-center items-center p-6'
const CARD_CLASSES = 'max-w-[560px] w-full text-center p-12'
const ICON_CLASSES = 'text-6xl mb-4 opacity-60'
const TITLE_CLASSES = 'text-2xl font-semibold mb-2'
const SUBTITLE_CLASSES = 'text-text-dim mb-2'
const DESCRIPTION_CLASSES = 'text-sm text-text-dim'

export function StatisticsPagePlaceholder() {
  const { t } = useTranslation('common')
  return (
    <div className={WRAPPER_CLASSES}>
      <Card padding="none" className={CARD_CLASSES}>
        <Icon name="bar_chart" className={ICON_CLASSES} />
        <h1 className={TITLE_CLASSES}>{t('statistics.title')}</h1>
        <p className={SUBTITLE_CLASSES}>{t('statistics.comingSoon')}</p>
        <p className={DESCRIPTION_CLASSES}>{t('statistics.description')}</p>
      </Card>
    </div>
  )
}
