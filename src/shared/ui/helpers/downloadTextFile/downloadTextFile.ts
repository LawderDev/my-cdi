const TEXT_BLOB_TYPE = 'text/plain;charset=utf-8'

/**
 * Triggers a browser download of the given text content.
 * In Electron (no `will-download` handler), this opens the native save dialog.
 */
export function downloadTextFile(content: string, fileName: string): void {
  const blob = new Blob([content], { type: TEXT_BLOB_TYPE })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}
