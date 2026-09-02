import { useRef, useState } from 'react'
import type { ToastContent, ToastSeverity } from '@ui/components/Toast'

const INITIAL_TOAST_ID = 1

export interface UseToastResult {
  toast: ToastContent | null
  show: (message: string, severity?: ToastSeverity) => void
  dismiss: () => void
}

export function useToast(): UseToastResult {
  const [toast, setToast] = useState<ToastContent | null>(null)
  const nextIdRef = useRef(INITIAL_TOAST_ID)

  function show(message: string, severity: ToastSeverity = 'success') {
    const id = nextIdRef.current
    nextIdRef.current += 1
    setToast({ id, message, severity })
  }

  function dismiss() {
    setToast(null)
  }

  return { toast, show, dismiss }
}
