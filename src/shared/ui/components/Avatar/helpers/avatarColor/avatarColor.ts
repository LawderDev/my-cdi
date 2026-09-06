import type { Palette } from '@mui/material/styles'

export interface AvatarColorPair {
  bg: string
  fg: string
}

export function buildAvatarColors(palette: Palette): AvatarColorPair[] {
  const backgrounds = [
    palette.primary.main,
    palette.info.main,
    palette.success.main,
    palette.warning.main,
    palette.error.main,
    palette.activity.relaxation
  ]
  return backgrounds.map((bg) => ({ bg, fg: palette.getContrastText(bg) }))
}

export function avatarColor(id: number, palette: Palette): AvatarColorPair {
  const colors = buildAvatarColors(palette)
  const index = ((id % colors.length) + colors.length) % colors.length
  const color = colors[index]
  if (!color) {
    const fallback = { bg: palette.primary.main, fg: palette.getContrastText(palette.primary.main) }
    return fallback
  }
  return color
}
