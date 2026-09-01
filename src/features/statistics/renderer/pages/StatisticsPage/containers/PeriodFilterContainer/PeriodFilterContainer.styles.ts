import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const BTN_HEIGHT_PX = 32
export const BTN_FONT_SIZE_PX = 12
export const BTN_FONT_WEIGHT = 500
export const ACTIVE_FONT_WEIGHT = 600
export const ICON_FONT_SIZE_PX = 14

export const PeriodFilterRow = styled('div', {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  gap: 1,
  flexWrap: 'wrap'
})

export const PeriodFilterButton = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})({
  height: `${BTN_HEIGHT_PX}px`,
  px: 1.75,
  borderRadius: 'var(--radius-xs)',
  fontSize: `${BTN_FONT_SIZE_PX}px`,
  fontWeight: BTN_FONT_WEIGHT,
  border: '1px solid',
  borderColor: 'var(--border)',
  transition: 'all 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  cursor: 'pointer',
  bgcolor: 'transparent',
  color: 'var(--text-dim)',
  '&[data-active="true"]': {
    fontWeight: ACTIVE_FONT_WEIGHT,
    borderColor: 'var(--accent-border)',
    bgcolor: 'var(--accent-bg)',
    color: 'var(--accent)'
  },
  '&:hover': {
    borderColor: 'var(--border-light)',
    color: 'var(--title)'
  },
  '&[data-active="true"]:hover': {
    borderColor: 'var(--accent-border)',
    color: 'var(--accent)'
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
})
