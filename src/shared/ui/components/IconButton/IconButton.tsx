import MuiIconButton from '@mui/material/IconButton'
import { Icon } from '../Icon'
import type { IconButtonProps, IconButtonTone } from './types/IconButtonProps'
import { buildIconButtonSx, ICON_FONT_SIZE_STYLE } from './IconButton.styles'

const TONE_TO_COLOR: Record<IconButtonTone, 'default' | 'error'> = {
  default: 'default',
  danger: 'error'
}

export function IconButton({ iconName, tone = 'default', className, ...rest }: IconButtonProps) {
  return (
    <MuiIconButton
      {...rest}
      className={className}
      color={TONE_TO_COLOR[tone]}
      size="small"
      data-tone={tone}
      sx={buildIconButtonSx(tone)}
    >
      <Icon name={iconName} style={ICON_FONT_SIZE_STYLE} />
    </MuiIconButton>
  )
}
