import type { ReactNode } from 'react'
import { TableElement, TableFooter, TableRoot } from './StudentTablePresenter.styles'

export interface StudentTablePresenterProps {
  headerNodes: ReactNode[]
  rowNodes: ReactNode[]
  countLabel: string
}

export function StudentTablePresenter({
  headerNodes,
  rowNodes,
  countLabel
}: StudentTablePresenterProps) {
  return (
    <TableRoot>
      <TableElement>
        <thead>
          <tr>{headerNodes}</tr>
        </thead>
        <tbody>{rowNodes}</tbody>
      </TableElement>
      <TableFooter>
        <span>{countLabel}</span>
      </TableFooter>
    </TableRoot>
  )
}
