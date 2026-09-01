import { Avatar } from '@ui/components/Avatar'
import type { AvatarSize } from '@ui/components/Avatar'

interface StudentAvatarPresenterProps {
  id: number
  initials: string
  size?: AvatarSize
  className?: string
}

export function StudentAvatarPresenter({
  id,
  initials,
  size,
  className
}: StudentAvatarPresenterProps) {
  return <Avatar initials={initials} colorSeed={id} size={size} className={className} />
}
