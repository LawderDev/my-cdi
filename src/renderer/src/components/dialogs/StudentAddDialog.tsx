import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from '@mui/material'
import type { Student } from '../../types/student'
import { useTranslation } from 'react-i18next'

interface StudentAddDialogProps {
  open: boolean
  onClose: () => void
  onCreate: (student: Omit<Student, 'id'>) => Promise<boolean>
}

const StudentAddDialog: React.FC<StudentAddDialogProps> = ({ open, onClose, onCreate }) => {
  const { t } = useTranslation()
  const [student, setStudent] = useState<Omit<Student, 'id'>>({
    nom: '',
    prenom: '',
    classe: ''
  })
  const [hasValidated, setHasValidated] = useState(false)

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasValidated(false)
    }
  }, [open])

  const handleFieldChange =
    (field: keyof Omit<Student, 'id'>) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setStudent((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const handleSave = async (): Promise<void> => {
    if (!isValid) {
      setHasValidated(true)
      return
    }
    const success = await onCreate(student)
    if (success) {
      setStudent({ nom: '', prenom: '', classe: '' }) // Reset form
      onClose()
    }
  }

  const handleClose = (): void => {
    setStudent({ nom: '', prenom: '', classe: '' }) // Reset on cancel
    onClose()
  }

  const isValid = student.nom.trim() && student.prenom.trim() && student.classe.trim()

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('studentPage.addStudentButton.label')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ marginTop: 1 }}>
          <TextField
            label="Nom"
            value={student.nom}
            onChange={handleFieldChange('nom')}
            fullWidth
            required
            error={hasValidated && !student.nom.trim()}
            helperText={hasValidated && !student.nom.trim() ? 'Le nom est requis' : ''}
          />
          <TextField
            label="Prénom"
            value={student.prenom}
            onChange={handleFieldChange('prenom')}
            fullWidth
            required
            error={hasValidated && !student.prenom.trim()}
            helperText={hasValidated && !student.prenom.trim() ? 'Le prénom est requis' : ''}
          />
          <TextField
            label="Classe"
            value={student.classe}
            onChange={handleFieldChange('classe')}
            fullWidth
            required
            error={hasValidated && !student.classe.trim()}
            helperText={hasValidated && !student.classe.trim() ? 'La classe est requise' : ''}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('common.cancel')}</Button>
        <Button variant="contained" onClick={handleSave}>
          {t('common.add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StudentAddDialog
