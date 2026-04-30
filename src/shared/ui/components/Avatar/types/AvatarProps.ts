export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps {
  initials: string
  colorSeed: number
  size?: AvatarSize
  className?: string
}
