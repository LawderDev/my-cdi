import MuiAvatar from '@mui/material/Avatar'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { AvatarSize } from './types/AvatarProps'

const LOW_OPACITY_HEX_SUFFIX = '22'

const AVATAR_SIZE_SM_PX = 28
const AVATAR_SIZE_MD_PX = 36
const AVATAR_SIZE_LG_PX = 48

const AVATAR_FONT_SM_PX = 11
const AVATAR_FONT_MD_PX = 13
const AVATAR_FONT_LG_PX = 15

const FONT_WEIGHT_SEMIBOLD = 600

const SIZE_PX: Record<AvatarSize, number> = {
  sm: AVATAR_SIZE_SM_PX,
  md: AVATAR_SIZE_MD_PX,
  lg: AVATAR_SIZE_LG_PX
}

const FONT_SIZE_PX: Record<AvatarSize, number> = {
  sm: AVATAR_FONT_SM_PX,
  md: AVATAR_FONT_MD_PX,
  lg: AVATAR_FONT_LG_PX
}

export const AvatarRoot = styled(MuiAvatar, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $bg: string; $size: AvatarSize }>(({ $bg, $size }) => ({
  width: `${SIZE_PX[$size]}px`,
  height: `${SIZE_PX[$size]}px`,
  fontSize: `${FONT_SIZE_PX[$size]}px`,
  fontWeight: FONT_WEIGHT_SEMIBOLD,
  backgroundColor: `${$bg}${LOW_OPACITY_HEX_SUFFIX}`,
  color: $bg,
  flexShrink: 0
}))
