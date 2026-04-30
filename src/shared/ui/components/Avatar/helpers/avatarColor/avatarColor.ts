export const AVATAR_COLOR_PAIRS = [
  ['#7C4DFF', '#fff'],
  ['#60a5fa', '#fff'],
  ['#4ade80', '#111'],
  ['#fbbf24', '#111'],
  ['#f87171', '#fff'],
  ['#c084fc', '#fff'],
  ['#fb923c', '#111'],
  ['#2dd4bf', '#111'],
  ['#818cf8', '#fff'],
  ['#a78bfa', '#fff'],
  ['#34d399', '#111'],
  ['#f472b6', '#fff']
] as const

export interface AvatarColorPair {
  bg: string
  fg: string
}

export function avatarColor(id: number): AvatarColorPair {
  const index =
    ((id % AVATAR_COLOR_PAIRS.length) + AVATAR_COLOR_PAIRS.length) % AVATAR_COLOR_PAIRS.length
  const pair = AVATAR_COLOR_PAIRS[index] ?? AVATAR_COLOR_PAIRS[0]
  return { bg: pair[0], fg: pair[1] }
}
