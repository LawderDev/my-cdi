import { Box, Paper, Typography } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import { useTranslation } from 'react-i18next'

const PLACEHOLDER_ICON_FONT_SIZE_PX = 64
const PLACEHOLDER_PAPER_MAX_WIDTH_PX = 560
const PLACEHOLDER_ICON_OPACITY = 0.6
const PLACEHOLDER_PAPER_PADDING = 6
const PLACEHOLDER_OUTER_PADDING = 4
const PLACEHOLDER_ICON_MARGIN_BOTTOM = 2

export function StatisticsPagePlaceholder() {
  const { t } = useTranslation('common')
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: PLACEHOLDER_OUTER_PADDING
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: PLACEHOLDER_PAPER_PADDING,
          textAlign: 'center',
          maxWidth: PLACEHOLDER_PAPER_MAX_WIDTH_PX,
          width: '100%'
        }}
      >
        <BarChartIcon
          sx={{
            fontSize: PLACEHOLDER_ICON_FONT_SIZE_PX,
            mb: PLACEHOLDER_ICON_MARGIN_BOTTOM,
            opacity: PLACEHOLDER_ICON_OPACITY
          }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          {t('statistics.title')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {t('statistics.comingSoon')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('statistics.description')}
        </Typography>
      </Paper>
    </Box>
  )
}
