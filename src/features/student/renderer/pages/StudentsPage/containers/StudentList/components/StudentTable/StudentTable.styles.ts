import type { SxProps, Theme } from '@mui/material'

const TABLE_CONTAINER_TOP_MARGIN = 2

export const tableContainerStyles: SxProps<Theme> = {
  mt: TABLE_CONTAINER_TOP_MARGIN
}

export const headerCellStyles: SxProps<Theme> = {
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 'bold'
}
