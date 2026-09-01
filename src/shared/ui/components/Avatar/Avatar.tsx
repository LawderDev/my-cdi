import MuiAvatar from '@mui/material/Avatar'
import { avatarColor } from './helpers/avatarColor'
import type { AvatarProps } from './types/AvatarProps'
import { buildAvatarSx } from './Avatar.styles'

export function Avatar({ initials, colorSeed, size = 'md', className }: AvatarProps) {
  const { bg } = avatarColor(colorSeed)
  return (
    <MuiAvatar className={className} sx={buildAvatarSx(bg, size)}>
      {initials}
    </MuiAvatar>
  )
}
