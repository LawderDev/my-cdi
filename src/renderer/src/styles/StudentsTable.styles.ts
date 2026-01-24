import { SxProps, Theme } from '@mui/material'

export const rootBoxStyles: SxProps<Theme> = {
  width: '100%',
  height: '77vh'
}

export const paperStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  mb: 2,
  overflow: 'auto',
  p: 2
}

export const tableStyles: SxProps<Theme> = {
  minWidth: 750,
  maxHeight: 100
}

export const selectableRowStyles: SxProps<Theme> = {
  cursor: 'pointer'
}

export const deleteButtonStyles: SxProps<Theme> = {
  ml: 1
}
