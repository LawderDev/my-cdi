import Snackbar from '@mui/material/Snackbar'
import type { ReactElement } from 'react'
import type { ToastProps } from './types/ToastProps'
import { ToastAlert } from './Toast.styles'

export const TOAST_AUTO_HIDE_MS = 4000

const TOAST_ANCHOR_ORIGIN = { vertical: 'bottom', horizontal: 'center' } as const

export function Toast({ toast, onClose }: ToastProps) {
  const content: ReactElement | undefined =
    toast === null ? undefined : (
      <ToastAlert severity={toast.severity} onClose={onClose} variant="filled">
        {toast.message}
      </ToastAlert>
    )
  return (
    <Snackbar
      key={toast?.id ?? 'idle'}
      open={toast !== null}
      autoHideDuration={TOAST_AUTO_HIDE_MS}
      onClose={onClose}
      anchorOrigin={TOAST_ANCHOR_ORIGIN}
    >
      {content}
    </Snackbar>
  )
}
