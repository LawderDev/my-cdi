import MuiButton from '@mui/material/Button'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const PRIMARY_HEIGHT_PX = 40
const SECONDARY_HEIGHT_PX = 36
const DANGER_HEIGHT_PX = 36
const PRIMARY_FONT_SIZE_PX = 13
const PRIMARY_FONT_WEIGHT = 600
const SECONDARY_FONT_WEIGHT = 500
const DISABLED_OPACITY = 0.5

export const ButtonRoot = styled(MuiButton, {
  shouldForwardProp: shouldForwardStyledProp
})({
  height: `${PRIMARY_HEIGHT_PX}px`,
  borderRadius: 'var(--radius-sm)',
  fontSize: `${PRIMARY_FONT_SIZE_PX}px`,
  textTransform: 'none',
  '&[data-variant="primary"]': {
    fontWeight: PRIMARY_FONT_WEIGHT,
    px: 2.5,
    backgroundColor: 'var(--accent)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(124,77,255,0.3)',
    '&:hover': {
      backgroundColor: 'var(--accent-hover)',
      boxShadow: '0 4px 16px rgba(124,77,255,0.4)'
    },
    '&.Mui-disabled': {
      opacity: DISABLED_OPACITY,
      color: '#fff',
      backgroundColor: 'var(--accent)'
    }
  },
  '&[data-variant="secondary"]': {
    height: `${SECONDARY_HEIGHT_PX}px`,
    fontWeight: SECONDARY_FONT_WEIGHT,
    px: 2,
    backgroundColor: 'var(--surface)',
    color: 'var(--title)',
    borderColor: 'var(--border)',
    '&:hover': {
      backgroundColor: 'var(--card)',
      borderColor: 'var(--border-light)'
    }
  },
  '&[data-variant="danger"]': {
    height: `${DANGER_HEIGHT_PX}px`,
    fontWeight: SECONDARY_FONT_WEIGHT,
    px: 2,
    backgroundColor: 'var(--danger-bg)',
    color: 'var(--danger)',
    border: '1px solid rgba(248,113,113,0.25)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'rgba(248,113,113,0.2)',
      boxShadow: 'none'
    }
  }
})
