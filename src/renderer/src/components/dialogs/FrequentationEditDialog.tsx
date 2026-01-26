import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete
} from '@mui/material'
import {
  ACTIVITY_OPTIONS,
  translateActivityToEnglish,
  translateActivityToFrench
} from '@shared/types/activities.enum'

interface FrequentationEditDialogProps {
  open: boolean
  onClose: () => void
  onSave: (activity: string) => void
  initialActivity: string
}

export const FrequentationEditDialog: React.FC<FrequentationEditDialogProps> = ({
  open,
  onClose,
  onSave,
  initialActivity
}) => {
  const [activity, setActivity] = useState(translateActivityToFrench(initialActivity))

  useEffect(() => {
    setActivity(translateActivityToFrench(initialActivity))
  }, [initialActivity])

  const handleSave = () => {
    if (!activity.trim()) {
      console.warn('Cannot save empty activity')
      return
    }
    const englishActivity = translateActivityToEnglish(activity)
    onSave(englishActivity)
    onClose()
  }

  const handleClose = () => {
    setActivity(initialActivity) // Reset on cancel
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier l&apos;activité</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={activity}
          onChange={(_, newValue) => {
            if (newValue) setActivity(newValue)
          }}
          options={ACTIVITY_OPTIONS}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Activité"
              margin="normal"
              autoFocus
              required
              error={activity.trim() === ''}
              helperText={activity.trim() === '' ? "L'activité est requise" : ''}
            />
          )}
          freeSolo
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleSave} variant="contained" disabled={activity.trim() === ''}>
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  )
}
