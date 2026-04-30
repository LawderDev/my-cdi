import type { HTMLAttributes, ReactNode } from 'react'

export type CardPadding = 'none' | 'compact' | 'default'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding
  children: ReactNode
}
