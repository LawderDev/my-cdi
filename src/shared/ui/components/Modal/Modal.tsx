import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { IconButton } from '../IconButton'
import type { ModalMaxWidth, ModalProps } from './types/ModalProps'
import { DialogBody, DialogFooter, DialogHeader, DialogRoot } from './Modal.styles'

const MAX_WIDTH_MAP: Record<ModalMaxWidth, 'xs' | 'sm' | 'md'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md'
}

export function Modal({ open, onClose, title, children, footer, maxWidth = 'md' }: ModalProps) {
  const { t } = useTranslation('common')
  return (
    <DialogRoot
      open={open}
      onClose={onClose}
      maxWidth={MAX_WIDTH_MAP[maxWidth]}
      fullWidth
      aria-label={title}
    >
      <DialogHeader>
        <Box component="span">{title}</Box>
        <IconButton iconName="close" aria-label={t('app.close')} onClick={onClose} />
      </DialogHeader>
      <DialogBody>{children}</DialogBody>
      {footer ? <DialogFooter>{footer}</DialogFooter> : null}
    </DialogRoot>
  )
}
