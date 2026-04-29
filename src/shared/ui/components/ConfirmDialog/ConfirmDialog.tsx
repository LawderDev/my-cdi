import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { ConfirmDialogProps } from './types/ConfirmDialogProps'

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onClose
}: ConfirmDialogProps) {
  const { t } = useTranslation('common')
  const resolvedConfirmLabel = confirmLabel ?? t('app.confirm')
  const resolvedCancelLabel = cancelLabel ?? t('app.cancel')
  const confirmColor = destructive ? 'error' : 'primary'

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {resolvedCancelLabel}
        </Button>
        <Button onClick={onConfirm} color={confirmColor} variant="contained" autoFocus>
          {resolvedConfirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
