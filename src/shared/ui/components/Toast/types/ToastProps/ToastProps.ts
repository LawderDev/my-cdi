export type ToastSeverity = 'success' | 'error' | 'info' | 'warning'

export interface ToastContent {
  id: number
  message: string
  severity: ToastSeverity
}

export interface ToastProps {
  toast: ToastContent | null
  onClose: () => void
}
