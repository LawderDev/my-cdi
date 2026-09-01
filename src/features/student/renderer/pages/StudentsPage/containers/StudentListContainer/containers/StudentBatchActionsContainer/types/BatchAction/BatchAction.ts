export type BatchAction =
  | { kind: 'delete'; ids: number[] }
  | { kind: 'select-all' }
  | { kind: 'clear-selection' }
