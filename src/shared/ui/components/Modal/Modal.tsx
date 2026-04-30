import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import { IconButton } from '../IconButton'
import type { ModalMaxWidth, ModalProps } from './types/ModalProps'

const MAX_WIDTH_MAP: Record<ModalMaxWidth, 'xs' | 'sm' | 'md'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md'
}

const PX_SPACING = 3
const PT_SPACING = 2.5
const PY_BODY_SPACING = 2.5
const PB_FOOTER_SPACING = 2.5
const FONT_WEIGHT_SEMIBOLD = 600

export function Modal({ open, onClose, title, children, footer, maxWidth = 'md' }: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={MAX_WIDTH_MAP[maxWidth]}
      fullWidth
      aria-label={title}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'var(--card)',
            backgroundImage: 'none',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-lg)'
          }
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: PX_SPACING,
          pt: PT_SPACING,
          pb: 0,
          fontSize: '16px',
          fontWeight: FONT_WEIGHT_SEMIBOLD
        }}
      >
        <Box component="span">{title}</Box>
        <IconButton iconName="close" aria-label="close" onClick={onClose} />
      </DialogTitle>
      <DialogContent sx={{ px: PX_SPACING, py: PY_BODY_SPACING }}>{children}</DialogContent>
      {footer ? (
        <DialogActions sx={{ px: PX_SPACING, pb: PB_FOOTER_SPACING, gap: 1 }}>
          {footer}
        </DialogActions>
      ) : null}
    </Dialog>
  )
}
