import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { Button } from '@ui/components/Button'
import { IconButton } from '@ui/components/IconButton'
import type { UpdateBannerViewProps } from './types/UpdateBannerViewProps'

const PROGRESS_PERCENT_DECIMAL_DIGITS = 0
const FALLBACK_PROGRESS_PERCENT = 0
const PERCENT_MAX = 100

const BASE_BANNER_SX = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 1.5,
  px: 2,
  py: 1.5,
  mt: 2,
  mx: 3.5,
  mb: 2,
  borderRadius: 'var(--radius-sm)',
  border: '1px solid'
}

const INFO_SX = {
  backgroundColor: 'var(--accent-bg)',
  color: 'var(--accent)',
  borderColor: 'var(--accent-border)'
}

const SUCCESS_SX = {
  backgroundColor: 'var(--success-bg)',
  color: 'var(--success)',
  borderColor: 'rgba(74, 222, 128, 0.25)'
}

const ERROR_SX = {
  backgroundColor: 'var(--danger-bg)',
  color: 'var(--danger)',
  borderColor: 'rgba(248, 113, 113, 0.25)'
}

const CONTENT_SX = { flex: 1, fontSize: '13px' }
const ACTIONS_SX = { display: 'flex', alignItems: 'center', gap: 1 }

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
      <Box role="status" sx={[BASE_BANNER_SX, INFO_SX]}>
        <Box sx={CONTENT_SX}>{t('updater.available', { version: versionAvailable ?? '' })}</Box>
        <IconButton iconName="close" aria-label={t('app.close')} onClick={onDismiss} />
      </Box>
    )
  }

  if (status === 'downloading') {
    const fillPercent = Math.min(progressPercent ?? FALLBACK_PROGRESS_PERCENT, PERCENT_MAX)
    const percentDisplay = (progressPercent ?? FALLBACK_PROGRESS_PERCENT).toFixed(
      PROGRESS_PERCENT_DECIMAL_DIGITS
    )
    return (
      <Box role="status" sx={[BASE_BANNER_SX, INFO_SX]}>
        <Box sx={CONTENT_SX}>
          {t('updater.downloading', { percent: percentDisplay })}
          <LinearProgress
            variant="determinate"
            value={fillPercent}
            sx={{ mt: 1, height: '4px', borderRadius: 'var(--radius-xs)' }}
          />
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
