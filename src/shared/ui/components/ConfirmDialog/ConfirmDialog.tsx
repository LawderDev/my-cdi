import { useTranslation } from 'react-i18next'
import { Modal } from '@ui/components/Modal'
import { Button } from '@ui/components/Button'
import type { ConfirmDialogProps } from './types/ConfirmDialogProps'
import { MessageText } from './ConfirmDialog.styles'

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
  const resolvedConfirm = confirmLabel ?? t('app.confirm')
  const resolvedCancel = cancelLabel ?? t('app.cancel')
  const confirmVariant = destructive ? 'danger' : 'primary'
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {resolvedCancel}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} autoFocus>
            {resolvedConfirm}
          </Button>
        </>
      }
    >
      <MessageText>{message}</MessageText>
    </Modal>
  )
}
