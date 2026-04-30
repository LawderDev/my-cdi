import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'

interface JournalEntryToolbarProps {
  entryCount: number
  onAddClick: () => void
}

const TOOLBAR_BOTTOM_MARGIN = 2

export function JournalEntryToolbar({ entryCount, onAddClick }: JournalEntryToolbarProps) {
  const { t } = useTranslation('frequentation')
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: TOOLBAR_BOTTOM_MARGIN
      }}
    >
      <Typography variant="subtitle1">{`${entryCount} ${t('fields.activity')}`}</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
        {t('addEntries')}
      </Button>
    </Box>
  )
}
