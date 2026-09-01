import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { FOOTER_FONT_SIZE_PX } from './StudentTable.styles'

export interface StudentTableProps {
  headerNodes: ReactNode[]
  rowNodes: ReactNode[]
  countLabel: string
}

export function StudentTable({ headerNodes, rowNodes, countLabel }: StudentTableProps) {
  return (
    <Box
      className="data-table"
      sx={{
        width: '100%',
        bgcolor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)'
      }}
    >
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>{headerNodes}</tr>
        </thead>
        <tbody>{rowNodes}</tbody>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderTop: '1px solid var(--border)',
          fontSize: `${FOOTER_FONT_SIZE_PX}px`,
          color: 'var(--text-dim)'
        }}
      >
        <Box component="span">{countLabel}</Box>
      </Box>
    </Box>
  )
}
