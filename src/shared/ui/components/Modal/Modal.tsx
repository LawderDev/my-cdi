import { useTranslation } from 'react-i18next'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import { IconButton } from '../IconButton'
import type { ModalMaxWidth, ModalProps } from './types/ModalProps'
import { BODY_SX, FOOTER_SX, PAPER_SX, TITLE_SX } from './Modal.styles'

const MAX_WIDTH_MAP: Record<ModalMaxWidth, 'xs' | 'sm' | 'md'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md'
}

export function Modal({ open, onClose, title, children, footer, maxWidth = 'md' }: ModalProps) {
  const { t } = useTranslation('common')
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={MAX_WIDTH_MAP[maxWidth]}
      fullWidth
      aria-label={title}
      slotProps={{ paper: { sx: PAPER_SX } }}
    >
      <DialogTitle sx={TITLE_SX}>
        <Box component="span">{title}</Box>
        <IconButton iconName="close" aria-label={t('app.close')} onClick={onClose} />
      </DialogTitle>
      <DialogContent sx={BODY_SX}>{children}</DialogContent>
      {footer ? <DialogActions sx={FOOTER_SX}>{footer}</DialogActions> : null}
    </Dialog>
  )
}
