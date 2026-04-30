import { Avatar } from '@mui/material'

const FIRST_CHAR_INDEX = 0

interface StudentAvatarProps {
  prenom: string
  nom: string
}

export function StudentAvatar({ prenom, nom }: StudentAvatarProps) {
  const initials = `${prenom.charAt(FIRST_CHAR_INDEX)}${nom.charAt(FIRST_CHAR_INDEX)}`.toUpperCase()
  return <Avatar>{initials}</Avatar>
}
