import type { CardPadding } from './types/CardProps'

const PADDING_NONE_PX = 0
const PADDING_COMPACT_PX = 16
const PADDING_DEFAULT_PX = 20

export const PADDING_PX: Record<CardPadding, number> = {
  none: PADDING_NONE_PX,
  compact: PADDING_COMPACT_PX,
  default: PADDING_DEFAULT_PX
}

export const SHADOW = 'var(--shadow)'

export const BASE_SX = {
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)'
}
