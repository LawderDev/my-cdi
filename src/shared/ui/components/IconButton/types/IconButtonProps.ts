import type { ButtonHTMLAttributes } from 'react'

export type IconButtonTone = 'default' | 'danger'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string
  tone?: IconButtonTone
}
