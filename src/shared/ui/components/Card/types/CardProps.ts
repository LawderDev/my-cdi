import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'
import type { PaperProps } from '@mui/material/Paper'

export type CardPadding = 'none' | 'compact' | 'default'

export interface CardProps extends Omit<PaperProps, 'children' | 'elevation'> {
  padding?: CardPadding
  children: ReactNode
  sx?: SxProps<Theme>
}
