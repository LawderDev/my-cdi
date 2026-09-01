import type { SxProps, Theme } from '@mui/material/styles'
import type { ButtonVariant } from './types/ButtonProps'

const PRIMARY_HEIGHT_PX = 40
const SECONDARY_HEIGHT_PX = 36
const DANGER_HEIGHT_PX = 36
const PRIMARY_FONT_SIZE_PX = 13
const PRIMARY_FONT_WEIGHT = 600
const SECONDARY_FONT_WEIGHT = 500

const PRIMARY_SX: SxProps<Theme> = {
  height: `${PRIMARY_HEIGHT_PX}px`,
  borderRadius: 'var(--radius-sm)',
  fontSize: `${PRIMARY_FONT_SIZE_PX}px`,
  fontWeight: PRIMARY_FONT_WEIGHT,
  textTransform: 'none',
  px: 2.5,
  backgroundColor: 'var(--accent)',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(124,77,255,0.3)',
  '&:hover': {
    backgroundColor: 'var(--accent-hover)',
    boxShadow: '0 4px 16px rgba(124,77,255,0.4)'
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    color: '#fff',
    backgroundColor: 'var(--accent)'
  }
}

const SECONDARY_SX: SxProps<Theme> = {
  height: `${SECONDARY_HEIGHT_PX}px`,
  borderRadius: 'var(--radius-sm)',
  fontSize: `${PRIMARY_FONT_SIZE_PX}px`,
  fontWeight: SECONDARY_FONT_WEIGHT,
  textTransform: 'none',
  px: 2,
  backgroundColor: 'var(--surface)',
  color: 'var(--title)',
  borderColor: 'var(--border)',
  '&:hover': {
    backgroundColor: 'var(--card)',
    borderColor: 'var(--border-light)'
  }
}

const DANGER_SX: SxProps<Theme> = {
  height: `${DANGER_HEIGHT_PX}px`,
  borderRadius: 'var(--radius-sm)',
  fontSize: `${PRIMARY_FONT_SIZE_PX}px`,
  fontWeight: SECONDARY_FONT_WEIGHT,
  textTransform: 'none',
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

export const SX_BY_VARIANT: Record<ButtonVariant, SxProps<Theme>> = {
  primary: PRIMARY_SX,
  secondary: SECONDARY_SX,
  danger: DANGER_SX
}
