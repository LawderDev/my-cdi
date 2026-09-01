import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { CardPadding } from './types/CardProps'

const PADDING_NONE_STEPS = 0
const PADDING_COMPACT_STEPS = 2
const PADDING_DEFAULT_STEPS = 2.5

const PADDING_STEPS: Record<CardPadding, number> = {
  none: PADDING_NONE_STEPS,
  compact: PADDING_COMPACT_STEPS,
  default: PADDING_DEFAULT_STEPS
}

export const CardRoot = styled(Paper, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $padding: CardPadding }>(({ theme, $padding }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(PADDING_STEPS[$padding]),
  boxShadow: theme.shadows[1]
}))
