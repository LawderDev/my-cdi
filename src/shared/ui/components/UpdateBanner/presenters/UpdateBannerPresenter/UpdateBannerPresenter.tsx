import { useTranslation } from 'react-i18next'
import { Button } from '@ui/components/Button'
import { IconButton } from '@ui/components/IconButton'
import type { UpdateBannerPresenterProps } from './types/UpdateBannerPresenterProps'
import { ActionsRow, Banner, ContentText, ProgressBar } from './UpdateBannerPresenter.styles'

export function UpdateBannerPresenter({
  status,
  versionAvailable,
  versionDownloaded,
  fillPercent,
  percentDisplay,
  errorMessage,
  onInstall,
  onDismiss
}: UpdateBannerPresenterProps) {
  const { t } = useTranslation('common')

  if (status === 'idle') {
    return null
  }

  if (status === 'available') {
    return (
      <Banner role="status" $status="available">
        <ContentText>{t('updater.available', { version: versionAvailable ?? '' })}</ContentText>
        <IconButton iconName="close" aria-label={t('app.close')} onClick={onDismiss} />
      </Banner>
    )
  }

  if (status === 'downloading') {
    return (
      <Banner role="status" $status="downloading">
        <ContentText>
          {t('updater.downloading', { percent: percentDisplay })}
          <ProgressBar variant="determinate" value={fillPercent} />
        </ContentText>
      </Banner>
    )
  }

  if (status === 'downloaded') {
    return (
      <Banner role="status" $status="downloaded">
        <ContentText>{t('updater.downloaded', { version: versionDownloaded ?? '' })}</ContentText>
        <ActionsRow>
          <Button variant="primary" onClick={onInstall}>
            {t('updater.installNow')}
          </Button>
          <Button variant="secondary" onClick={onDismiss}>
            {t('updater.dismiss')}
          </Button>
        </ActionsRow>
      </Banner>
    )
  }

  return (
    <Banner role="alert" $status="error">
      <ContentText>{t('updater.error', { message: errorMessage ?? '' })}</ContentText>
      <IconButton iconName="close" aria-label={t('app.close')} onClick={onDismiss} />
    </Banner>
  )
}
