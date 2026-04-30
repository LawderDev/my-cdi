import { Box, Button, Paper, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useTranslation } from 'react-i18next'
import type { ErrorFallbackProps } from './types/ErrorFallbackProps'

const ERROR_ICON_FONT_SIZE_PX = 48
const FALLBACK_PAPER_MAX_WIDTH_PX = 600
const FALLBACK_PAPER_PADDING = 4
const FALLBACK_BOX_PADDING = 3
const FALLBACK_HEADER_GAP = 2
const FALLBACK_HEADER_MARGIN_BOTTOM = 2
const FALLBACK_DESCRIPTION_MARGIN_BOTTOM = 3
const FALLBACK_DETAILS_MARGIN_BOTTOM = 3
const FALLBACK_PRE_MARGIN_TOP = 1
const FALLBACK_DETAILS_FONT_SIZE_REM = 0.85
const FALLBACK_MIN_HEIGHT_VH = 60

export function ErrorFallback({ error, onReload }: ErrorFallbackProps) {
  const { t } = useTranslation('common')
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: `${FALLBACK_MIN_HEIGHT_VH}vh`,
        p: FALLBACK_BOX_PADDING
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: FALLBACK_PAPER_PADDING, maxWidth: FALLBACK_PAPER_MAX_WIDTH_PX, width: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: FALLBACK_HEADER_GAP,
            mb: FALLBACK_HEADER_MARGIN_BOTTOM
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: ERROR_ICON_FONT_SIZE_PX }} />
          <Typography variant="h5" component="h1">
            {t('errorBoundary.title')}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: FALLBACK_DESCRIPTION_MARGIN_BOTTOM }}
        >
          {t('errorBoundary.description')}
        </Typography>
        <Box
          component="details"
          sx={{
            mb: FALLBACK_DETAILS_MARGIN_BOTTOM,
            fontFamily: 'monospace',
            fontSize: `${FALLBACK_DETAILS_FONT_SIZE_REM}rem`,
            color: 'text.secondary'
          }}
        >
          <summary>{t('errorBoundary.details')}</summary>
          <Box component="pre" sx={{ whiteSpace: 'pre-wrap', mt: FALLBACK_PRE_MARGIN_TOP }}>
            {error.message}
          </Box>
        </Box>
        <Button onClick={onReload} variant="contained" color="primary">
          {t('errorBoundary.reload')}
        </Button>
      </Paper>
    </Box>
  )
}
