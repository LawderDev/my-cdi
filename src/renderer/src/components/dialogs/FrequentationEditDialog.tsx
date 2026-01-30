import React, { useState, useMemo } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete
} from '@mui/material'
import { ActivityType } from '@shared/types/activities.enum'
import { useTranslation } from 'react-i18next'

interface FrequentationEditDialogProps {
  open: boolean
  onClose: () => void
  onSave: (activity: string) => Promise<boolean>
  initialActivity: string
}

export const FrequentationEditDialog: React.FC<FrequentationEditDialogProps> = ({
  open,
  onClose,
  onSave,
  initialActivity
}) => {
  const { t } = useTranslation()

  const activityOptions = useMemo(() => Object.values(ActivityType), [])

  const [activity, setActivity] = useState(initialActivity)

  const handleSave = async (): Promise<void> => {
    if (!activity.trim()) {
      console.warn('Cannot save empty activity')
      return
    }

    const success = await onSave(activity || 'other')
    if (success) {
      onClose()
    }
  }

  const handleClose = (): void => {
    setActivity(initialActivity) // Reset on cancel
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('dialog.editActivity.title')}</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={activity}
          onChange={(_, newValue) => {
            setActivity(newValue || '')
          }}
          options={activityOptions}
          getOptionLabel={(option) => t(`activity.${option}`)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('activity.title')}
              margin="normal"
              autoFocus
              required
              error={activity.trim() === ''}
              helperText={activity.trim() === '' ? t('dialog.editActivity.required') : ''}
            />
          )}
          freeSolo
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('common.cancel')}</Button>
        <Button onClick={handleSave} variant="contained" disabled={activity.trim() === ''}>
          {t('common.save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
