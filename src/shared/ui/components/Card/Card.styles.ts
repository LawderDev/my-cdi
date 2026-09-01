import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { CardPadding } from './types/CardProps'

const PADDING_NONE_PX = 0
const PADDING_COMPACT_PX = 16
const PADDING_DEFAULT_PX = 20

const PADDING_PX: Record<CardPadding, number> = {
  none: PADDING_NONE_PX,
  compact: PADDING_COMPACT_PX,
  default: PADDING_DEFAULT_PX
}

const SHADOW = 'var(--shadow)'

export const CardRoot = styled(Paper, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $padding: CardPadding }>(({ $padding }) => ({
  backgroundColor: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  padding: `${PADDING_PX[$padding]}px`,
  boxShadow: SHADOW
}))
