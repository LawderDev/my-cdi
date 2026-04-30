import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ActivityRadioGroup } from '@frequentation/pages/JournalPage/containers/JournalEntryForm/components/ActivityRadioGroup'
import type { ActivityType } from '@types'

interface JournalEntryEditDialogProps {
  open: boolean
  activity: ActivityType
  activities: { value: ActivityType; label: string }[]
  onActivityChange: (next: ActivityType) => void
  onSubmit: () => void
  onClose: () => void
}

export function JournalEntryEditDialog({
  open,
  activity,
  activities,
  onActivityChange,
  onSubmit,
  onClose
}: JournalEntryEditDialogProps) {
  const { t } = useTranslation('frequentation')

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{t('edit.title')}</DialogTitle>
      <DialogContent>
        <ActivityRadioGroup activities={activities} value={activity} onChange={onActivityChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('form.cancel')}</Button>
        <Button variant="contained" onClick={onSubmit}>
          {t('edit.save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
