import { useTranslation } from 'react-i18next'
import { Button } from '@ui/components/Button'
import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import type { ErrorFallbackProps } from './types/ErrorFallbackProps'

const WRAPPER_CLASSES = 'flex justify-center items-center min-h-[60vh] p-6'
const CARD_CLASSES = 'max-w-[600px] w-full'
const HEADER_CLASSES = 'flex items-center gap-3 mb-4'
const ICON_CLASSES = 'text-danger text-5xl'
const TITLE_CLASSES = 'text-xl font-semibold'
const DESCRIPTION_CLASSES = 'text-text mb-5'
const DETAILS_CLASSES = 'mb-5 font-mono text-xs text-text-dim'
const PRE_CLASSES = 'whitespace-pre-wrap mt-1'

export function ErrorFallback({ error, onReload }: ErrorFallbackProps) {
  const { t } = useTranslation('common')
  return (
    <div className={WRAPPER_CLASSES}>
      <Card className={CARD_CLASSES}>
        <div className={HEADER_CLASSES}>
          <Icon name="error_outline" className={ICON_CLASSES} />
          <h1 className={TITLE_CLASSES}>{t('errorBoundary.title')}</h1>
        </div>
        <p className={DESCRIPTION_CLASSES}>{t('errorBoundary.description')}</p>
        <details className={DETAILS_CLASSES}>
          <summary>{t('errorBoundary.details')}</summary>
          <pre className={PRE_CLASSES}>{error.message}</pre>
        </details>
        <Button variant="primary" onClick={onReload}>
          {t('errorBoundary.reload')}
        </Button>
      </Card>
    </div>
  )
}
