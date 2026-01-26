import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

interface StudentDeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const StudentDeleteDialog: React.FC<StudentDeleteDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>Voulez-vous vraiment supprimer cet élève ?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StudentDeleteDialog
