import { Avatar } from '@ui/components/Avatar'
import type { AvatarSize } from '@ui/components/Avatar'

const FIRST_CHAR_INDEX = 0

interface StudentAvatarProps {
  id: number
  prenom: string
  nom: string
  size?: AvatarSize
  className?: string
}

export function StudentAvatar({ id, prenom, nom, size, className }: StudentAvatarProps) {
  const initials = `${prenom.charAt(FIRST_CHAR_INDEX)}${nom.charAt(FIRST_CHAR_INDEX)}`.toUpperCase()
  return <Avatar initials={initials} colorSeed={id} size={size} className={className} />
}
