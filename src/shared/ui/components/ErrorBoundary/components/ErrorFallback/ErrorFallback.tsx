import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button } from '@ui/components/Button'
import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import type { ErrorFallbackProps } from './types/ErrorFallbackProps'
import {
  CARD_SX,
  DESCRIPTION_SX,
  DETAILS_SX,
  HEADING_SX,
  ICON_STYLE,
  PAGE_SX,
  PRE_SX,
  TITLE_ROW_SX
} from './ErrorFallback.styles'

export function ErrorFallback({ error, onReload }: ErrorFallbackProps) {
  const { t } = useTranslation('common')
  return (
    <Box sx={PAGE_SX}>
      <Card sx={CARD_SX}>
        <Box sx={TITLE_ROW_SX}>
          <Icon name="error_outline" style={ICON_STYLE} />
          <Typography component="h1" sx={HEADING_SX}>
            {t('errorBoundary.title')}
          </Typography>
        </Box>
        <Typography sx={DESCRIPTION_SX}>{t('errorBoundary.description')}</Typography>
        <Box component="details" sx={DETAILS_SX}>
          <Box component="summary">{t('errorBoundary.details')}</Box>
          <Box component="pre" sx={PRE_SX}>
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
