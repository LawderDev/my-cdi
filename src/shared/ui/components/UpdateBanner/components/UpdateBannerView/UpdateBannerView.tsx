import { Alert, Box, Button, LinearProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { UpdateBannerViewProps } from './types/UpdateBannerViewProps'

const PROGRESS_PERCENT_DECIMAL_DIGITS = 0
const FALLBACK_PROGRESS_PERCENT = 0
const ALERT_MARGIN_BOTTOM = 2
const PROGRESS_MARGIN_TOP = 1

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
      <Alert severity="info" onClose={onDismiss} sx={{ mb: ALERT_MARGIN_BOTTOM }}>
        {t('updater.available', { version: versionAvailable ?? '' })}
      </Alert>
    )
  }

  if (status === 'downloading') {
    const percentDisplay = (progressPercent ?? FALLBACK_PROGRESS_PERCENT).toFixed(
      PROGRESS_PERCENT_DECIMAL_DIGITS
    )
    return (
      <Alert severity="info" sx={{ mb: ALERT_MARGIN_BOTTOM }}>
        <Box>
          {t('updater.downloading', { percent: percentDisplay })}
          <LinearProgress
            variant="determinate"
            value={progressPercent ?? FALLBACK_PROGRESS_PERCENT}
            sx={{ mt: PROGRESS_MARGIN_TOP }}
          />
        </Box>
      </Alert>
    )
  }

  if (status === 'downloaded') {
    return (
      <Alert
        severity="success"
        sx={{ mb: ALERT_MARGIN_BOTTOM }}
        action={
          <>
            <Button onClick={onInstall} color="inherit" size="small">
              {t('updater.installNow')}
            </Button>
            <Button onClick={onDismiss} color="inherit" size="small">
              {t('updater.dismiss')}
            </Button>
          </>
        }
      >
        {t('updater.downloaded', { version: versionDownloaded ?? '' })}
      </Alert>
    )
  }

  return (
    <Alert severity="error" onClose={onDismiss} sx={{ mb: ALERT_MARGIN_BOTTOM }}>
      {t('updater.error', { message: errorMessage ?? '' })}
    </Alert>
  )
}
