import React from 'react'
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

interface StudentEditDialogProps {
  open: boolean
  student: Student | null
  onClose: () => void
  onSave: () => void
  onUpdateStudent: (updates: Partial<Student>) => void
}

const StudentEditDialog: React.FC<StudentEditDialogProps> = ({
  open,
  student,
  onClose,
  onSave,
  onUpdateStudent
}) => {
  const handleFieldChange =
    (field: keyof Student) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target
      if (target && 'value' in target) {
        onUpdateStudent({ [field]: (target as HTMLInputElement).value })
      }
    }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier élève</DialogTitle>
      <DialogContent>
        {student && (
          <Stack spacing={2} sx={{ marginTop: 1 }}>
            <TextField
              label="Nom"
              value={student.nom}
              onChange={handleFieldChange('nom')}
              fullWidth
            />
            <TextField
              label="Prénom"
              value={student.prenom}
              onChange={handleFieldChange('prenom')}
              fullWidth
            />
            <TextField
              label="Classe"
              value={student.classe}
              onChange={handleFieldChange('classe')}
              fullWidth
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={onSave}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StudentEditDialog
