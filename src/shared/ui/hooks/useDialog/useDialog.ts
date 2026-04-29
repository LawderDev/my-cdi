import { useState } from 'react'

export function useDialog(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return { isOpen, open, close } as const
}
