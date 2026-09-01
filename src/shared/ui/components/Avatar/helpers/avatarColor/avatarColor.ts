import { theme } from '@ui/theme'

export const AVATAR_COLORS = [
  theme.palette.primary.main,
  theme.palette.info.main,
  theme.palette.success.main,
  theme.palette.warning.main,
  theme.palette.error.main,
  theme.palette.activity.relaxation,
  '#fb923c',
  '#2dd4bf',
  '#818cf8',
  '#a78bfa',
  '#34d399',
  '#f472b6'
] as const

export interface AvatarColorPair {
  bg: string
  fg: string
}

export function avatarColor(id: number): AvatarColorPair {
  const index = ((id % AVATAR_COLORS.length) + AVATAR_COLORS.length) % AVATAR_COLORS.length
  const bg = AVATAR_COLORS[index] ?? AVATAR_COLORS[0]
  return { bg, fg: theme.palette.getContrastText(bg) }
}
