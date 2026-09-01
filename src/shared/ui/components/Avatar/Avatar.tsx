import { avatarColor } from './helpers/avatarColor'
import type { AvatarProps } from './types/AvatarProps'
import { AvatarRoot } from './Avatar.styles'

export function Avatar({ initials, colorSeed, size = 'md', className }: AvatarProps) {
  const { bg } = avatarColor(colorSeed)
  return (
    <AvatarRoot className={className} $bg={bg} $size={size}>
      {initials}
    </AvatarRoot>
  )
}
