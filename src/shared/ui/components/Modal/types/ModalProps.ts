import type { ReactNode } from 'react'

export type ModalMaxWidth = 'sm' | 'md' | 'lg'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  maxWidth?: ModalMaxWidth
}
