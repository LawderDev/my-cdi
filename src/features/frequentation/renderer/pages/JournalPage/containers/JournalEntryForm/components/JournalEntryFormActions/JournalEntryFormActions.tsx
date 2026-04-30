import { Button, DialogActions } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface JournalEntryFormActionsProps {
  isSubmitting: boolean
  onCancel: () => void
}

export function JournalEntryFormActions({ isSubmitting, onCancel }: JournalEntryFormActionsProps) {
  const { t } = useTranslation('frequentation')
  return (
    <DialogActions>
      <Button onClick={onCancel}>{t('form.cancel')}</Button>
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {t('form.submit')}
      </Button>
    </DialogActions>
  )
}
