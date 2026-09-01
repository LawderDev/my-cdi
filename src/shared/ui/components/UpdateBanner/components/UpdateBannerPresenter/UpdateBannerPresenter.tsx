import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { Button } from '@ui/components/Button'
import { IconButton } from '@ui/components/IconButton'
import type { UpdateBannerPresenterProps } from './types/UpdateBannerPresenterProps'
import {
  ACTIONS_SX,
  BASE_BANNER_SX,
  CONTENT_SX,
  ERROR_SX,
  INFO_SX,
  PROGRESS_SX,
  SUCCESS_SX
} from './UpdateBannerPresenter.styles'

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
      <Box role="status" sx={[BASE_BANNER_SX, INFO_SX]}>
        <Box sx={CONTENT_SX}>{t('updater.available', { version: versionAvailable ?? '' })}</Box>
        <IconButton iconName="close" aria-label={t('app.close')} onClick={onDismiss} />
      </Box>
    )
  }

  if (status === 'downloading') {
    return (
      <Box role="status" sx={[BASE_BANNER_SX, INFO_SX]}>
        <Box sx={CONTENT_SX}>
          {t('updater.downloading', { percent: percentDisplay })}
          <LinearProgress variant="determinate" value={fillPercent} sx={PROGRESS_SX} />
        </Box>
      </Box>
    )
  }

  if (status === 'downloaded') {
    return (
      <Box role="status" sx={[BASE_BANNER_SX, SUCCESS_SX]}>
        <Box sx={CONTENT_SX}>{t('updater.downloaded', { version: versionDownloaded ?? '' })}</Box>
        <Box sx={ACTIONS_SX}>
          <Button variant="primary" onClick={onInstall}>
            {t('updater.installNow')}
          </Button>
          <Button variant="secondary" onClick={onDismiss}>
            {t('updater.dismiss')}
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box role="alert" sx={[BASE_BANNER_SX, ERROR_SX]}>
      <Box sx={CONTENT_SX}>{t('updater.error', { message: errorMessage ?? '' })}</Box>
      <IconButton iconName="close" aria-label={t('app.close')} onClick={onDismiss} />
    </Box>
  )
}
