import { Avatar } from '@ui/components/Avatar'
import type { AvatarSize } from '@ui/components/Avatar'

interface StudentAvatarProps {
  id: number
  initials: string
  size?: AvatarSize
  className?: string
}

export function StudentAvatar({ id, initials, size, className }: StudentAvatarProps) {
  return <Avatar initials={initials} colorSeed={id} size={size} className={className} />
}
