export interface KeyboardShortcut {
  key: string
  ctrlOrMeta: boolean
  shift?: boolean
  alt?: boolean
  handler: () => void
}
