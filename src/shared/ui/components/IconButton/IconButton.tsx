import MuiIconButton from '@mui/material/IconButton'
import { Icon } from '../Icon'
import type { IconButtonProps, IconButtonTone } from './types/IconButtonProps'

const TONE_TO_COLOR: Record<IconButtonTone, 'default' | 'error'> = {
  default: 'default',
  danger: 'error'
}

const BUTTON_SIZE_PX = 36
const ICON_FONT_SIZE_PX = 18

const HOVER_BG_BY_TONE: Record<IconButtonTone, string> = {
  default: 'var(--card)',
  danger: 'var(--danger-bg)'
}

const COLOR_BY_TONE: Record<IconButtonTone, string> = {
  default: 'var(--text-dim)',
  danger: 'var(--danger)'
}

const HOVER_COLOR_BY_TONE: Record<IconButtonTone, string> = {
  default: 'var(--title)',
  danger: 'var(--danger)'
}

export function IconButton({ iconName, tone = 'default', className, ...rest }: IconButtonProps) {
  return (
    <MuiIconButton
      {...rest}
      className={className}
      color={TONE_TO_COLOR[tone]}
      size="small"
      data-tone={tone}
      sx={{
        width: `${BUTTON_SIZE_PX}px`,
        height: `${BUTTON_SIZE_PX}px`,
        borderRadius: 'var(--radius-xs)',
        color: COLOR_BY_TONE[tone],
        transition: 'all 0.15s',
        '&:hover': {
          backgroundColor: HOVER_BG_BY_TONE[tone],
          color: HOVER_COLOR_BY_TONE[tone]
        }
      }}
    >
      <Icon name={iconName} style={{ fontSize: `${ICON_FONT_SIZE_PX}px` }} />
    </MuiIconButton>
  )
}
