import { avatarColor } from './helpers/avatarColor'
import type { AvatarProps } from './types/AvatarProps'

const BASE_CLASSES =
  'rounded-full inline-flex items-center justify-center font-semibold flex-shrink-0'

const SIZE_CLASSES = {
  sm: 'w-7 h-7 text-[11px]',
  md: 'w-9 h-9 text-[13px]',
  lg: 'w-12 h-12 text-[15px]'
} as const

const LOW_OPACITY_HEX_SUFFIX = '22'

export function Avatar({ initials, colorSeed, size = 'md', className }: AvatarProps) {
  const { bg } = avatarColor(colorSeed)
  const finalClass = [BASE_CLASSES, SIZE_CLASSES[size], className].filter(Boolean).join(' ')
  return (
    <div
      className={finalClass}
      style={{ backgroundColor: `${bg}${LOW_OPACITY_HEX_SUFFIX}`, color: bg }}
    >
      {initials}
    </div>
  )
}
