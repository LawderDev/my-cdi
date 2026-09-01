import type { ReactNode } from 'react'
import { GridRoot } from './ActivityGridPresenter.styles'

export interface ActivityGridPresenterProps {
  tileNodes: ReactNode[]
}

export function ActivityGridPresenter({ tileNodes }: ActivityGridPresenterProps) {
  return <GridRoot>{tileNodes}</GridRoot>
}
