import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { IconButton } from '../IconButton'
import type { ModalProps } from './types/ModalProps'

const OVERLAY_CLASSES =
  'fixed inset-0 bg-black/55 flex items-center justify-center z-[1000] transition-opacity duration-200'

const MODAL_BASE_CLASSES =
  'bg-card border border-border rounded shadow-lg w-full max-h-[85vh] overflow-y-auto transition-transform duration-200'

const HEADER_CLASSES = 'flex items-center justify-between px-6 pt-5'
const TITLE_CLASSES = 'text-base font-semibold'
const BODY_CLASSES = 'px-6 py-5'
const FOOTER_CLASSES = 'flex justify-end gap-2 px-6 pb-5'

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-[360px]',
  md: 'max-w-[480px]',
  lg: 'max-w-[640px]'
} as const

const ESCAPE_KEY = 'Escape'

export function Modal({ open, onClose, title, children, footer, maxWidth = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === ESCAPE_KEY) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const modalClass = [MODAL_BASE_CLASSES, MAX_WIDTH_CLASSES[maxWidth]].join(' ')

  return createPortal(
    <div
      data-modal-overlay="true"
      role="presentation"
      className={OVERLAY_CLASSES}
      onClick={handleOverlayClick}
    >
      <div role="dialog" aria-modal="true" aria-label={title} className={modalClass}>
        <div className={HEADER_CLASSES}>
          <h3 className={TITLE_CLASSES}>{title}</h3>
          <IconButton iconName="close" aria-label="close" onClick={onClose} />
        </div>
        <div className={BODY_CLASSES}>{children}</div>
        {footer ? <div className={FOOTER_CLASSES}>{footer}</div> : null}
      </div>
    </div>,
    document.body
  )
}
