import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button } from '@ui/components/Button'
import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import { MONO_FONT_FAMILY } from '@ui/theme'
import type { ErrorFallbackProps } from './types/ErrorFallbackProps'

const CARD_MAX_WIDTH_PX = 600
const ICON_FONT_SIZE_PX = 48
const FONT_WEIGHT_SEMIBOLD = 600

export function ErrorFallback({ error, onReload }: ErrorFallbackProps) {
  const { t } = useTranslation('common')
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        p: 3
      }}
    >
      <Card sx={{ maxWidth: `${CARD_MAX_WIDTH_PX}px`, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Icon
            name="error_outline"
            style={{ color: 'var(--danger)', fontSize: `${ICON_FONT_SIZE_PX}px` }}
          />
          <Typography component="h1" sx={{ fontSize: '20px', fontWeight: FONT_WEIGHT_SEMIBOLD }}>
            {t('errorBoundary.title')}
          </Typography>
        </Box>
        <Typography sx={{ color: 'var(--text)', mb: 2.5 }}>
          {t('errorBoundary.description')}
        </Typography>
        <Box
          component="details"
          sx={{
            mb: 2.5,
            fontFamily: MONO_FONT_FAMILY,
            fontSize: '12px',
            color: 'var(--text-dim)'
          }}
        >
          <Box component="summary">{t('errorBoundary.details')}</Box>
          <Box component="pre" sx={{ whiteSpace: 'pre-wrap', mt: 0.5 }}>
            {error.message}
          </Box>
        </Box>
        <Button variant="primary" onClick={onReload}>
          {t('errorBoundary.reload')}
        </Button>
      </Card>
    </Box>
  )
}
