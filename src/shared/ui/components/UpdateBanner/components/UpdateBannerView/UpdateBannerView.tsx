import { useTranslation } from 'react-i18next'
import { Button } from '@ui/components/Button'
import { IconButton } from '@ui/components/IconButton'
import type { UpdateBannerViewProps } from './types/UpdateBannerViewProps'

const PROGRESS_PERCENT_DECIMAL_DIGITS = 0
const FALLBACK_PROGRESS_PERCENT = 0
const PERCENT_MAX = 100

const BANNER_BASE_CLASSES = 'flex items-start gap-3 px-4 py-3 mb-4 mx-7 mt-4 rounded border'
const BANNER_INFO_CLASSES = 'bg-accent-bg text-accent border-accent-border'
const BANNER_SUCCESS_CLASSES = 'bg-success-bg text-success border-success/25'
const BANNER_ERROR_CLASSES = 'bg-danger-bg text-danger border-danger/25'

const CONTENT_CLASSES = 'flex-1 text-[13px]'
const ACTIONS_CLASSES = 'flex items-center gap-2'
const PROGRESS_TRACK_CLASSES = 'h-1 mt-2 rounded bg-accent/15 overflow-hidden'
const PROGRESS_FILL_CLASSES = 'h-full bg-accent transition-all duration-200'

export function UpdateBannerView({
  status,
  versionAvailable,
  versionDownloaded,
  progressPercent,
  errorMessage,
  onInstall,
  onDismiss
}: UpdateBannerViewProps) {
  const { t } = useTranslation('common')

  if (status === 'idle') {
    return null
  }

  if (status === 'available') {
    return (
      <div role="status" className={`${BANNER_BASE_CLASSES} ${BANNER_INFO_CLASSES}`}>
        <div className={CONTENT_CLASSES}>
          {t('updater.available', { version: versionAvailable ?? '' })}
        </div>
        <IconButton iconName="close" aria-label={t('app.close')} onClick={onDismiss} />
      </div>
    )
  }

  if (status === 'downloading') {
    const fillPercent = Math.min(progressPercent ?? FALLBACK_PROGRESS_PERCENT, PERCENT_MAX)
    const percentDisplay = (progressPercent ?? FALLBACK_PROGRESS_PERCENT).toFixed(
      PROGRESS_PERCENT_DECIMAL_DIGITS
    )
    return (
      <div role="status" className={`${BANNER_BASE_CLASSES} ${BANNER_INFO_CLASSES}`}>
        <div className={CONTENT_CLASSES}>
          {t('updater.downloading', { percent: percentDisplay })}
          <div className={PROGRESS_TRACK_CLASSES}>
            <div className={PROGRESS_FILL_CLASSES} style={{ width: `${fillPercent}%` }} />
          </div>
        </div>
      </div>
    )
  }

  if (status === 'downloaded') {
    return (
      <div role="status" className={`${BANNER_BASE_CLASSES} ${BANNER_SUCCESS_CLASSES}`}>
        <div className={CONTENT_CLASSES}>
          {t('updater.downloaded', { version: versionDownloaded ?? '' })}
        </div>
        <div className={ACTIONS_CLASSES}>
          <Button variant="primary" onClick={onInstall}>
            {t('updater.installNow')}
          </Button>
          <Button variant="secondary" onClick={onDismiss}>
            {t('updater.dismiss')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div role="alert" className={`${BANNER_BASE_CLASSES} ${BANNER_ERROR_CLASSES}`}>
      <div className={CONTENT_CLASSES}>{t('updater.error', { message: errorMessage ?? '' })}</div>
      <IconButton iconName="close" aria-label={t('app.close')} onClick={onDismiss} />
    </div>
  )
}
