import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ActivityRadioGroup } from '@frequentation/pages/JournalPage/containers/JournalEntryForm/components/ActivityRadioGroup'
import type { ActivityType } from '@types'

interface JournalEntryEditDialogProps {
  open: boolean
  currentActivity: ActivityType
  activities: { value: ActivityType; label: string }[]
  onSubmit: (next: ActivityType) => void
  onClose: () => void
}

export function JournalEntryEditDialog({
  open,
  currentActivity,
  activities,
  onSubmit,
  onClose
}: JournalEntryEditDialogProps) {
  const { t } = useTranslation('frequentation')
  const [activity, setActivity] = useState<ActivityType>(currentActivity)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{t('edit.title')}</DialogTitle>
      <DialogContent>
        <ActivityRadioGroup activities={activities} value={activity} onChange={setActivity} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('form.cancel')}</Button>
        <Button variant="contained" onClick={() => onSubmit(activity)}>
          {t('edit.save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
