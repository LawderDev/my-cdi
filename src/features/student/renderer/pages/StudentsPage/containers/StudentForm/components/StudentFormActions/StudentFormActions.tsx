import { DialogActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface StudentFormActionsProps {
  isSubmitting: boolean
  onCancel: () => void
  submitLabel: string
}

export function StudentFormActions({
  isSubmitting,
  onCancel,
  submitLabel
}: StudentFormActionsProps) {
  const { t } = useTranslation('common')

  return (
    <DialogActions>
      <Button onClick={onCancel} disabled={isSubmitting}>
        {t('app.cancel')}
      </Button>
      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </DialogActions>
  )
}
