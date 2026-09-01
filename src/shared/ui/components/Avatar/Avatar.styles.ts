import MuiAvatar from '@mui/material/Avatar'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { AvatarSize } from './types/AvatarProps'
import { FONT_WEIGHTS, TYPE_SCALE } from '@ui/theme'

const AVATAR_SIZE_SM_PX = 28
const AVATAR_SIZE_MD_PX = 36
const AVATAR_SIZE_LG_PX = 48
const BG_ALPHA = 0.13

const SIZE_PX: Record<AvatarSize, number> = {
  sm: AVATAR_SIZE_SM_PX,
  md: AVATAR_SIZE_MD_PX,
  lg: AVATAR_SIZE_LG_PX
}

const FONT_SIZE_BY_SIZE: Record<AvatarSize, number> = {
  sm: TYPE_SCALE.caption,
  md: TYPE_SCALE.body1,
  lg: TYPE_SCALE.subtitle1
}

export const AvatarRoot = styled(MuiAvatar, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $bg: string; $size: AvatarSize }>(({ $bg, $size }) => ({
  width: `${SIZE_PX[$size]}px`,
  height: `${SIZE_PX[$size]}px`,
  fontSize: FONT_SIZE_BY_SIZE[$size],
  fontWeight: FONT_WEIGHTS.semibold,
  backgroundColor: alpha($bg, BG_ALPHA),
  color: $bg,
  flexShrink: 0
}))
