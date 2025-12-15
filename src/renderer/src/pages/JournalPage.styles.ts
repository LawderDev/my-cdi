import { SxProps, Theme } from '@mui/material'

export const rootContainerStyles: SxProps<Theme> = {
  mt: '30px',
  minWidth: '100%',
  display: 'flex',
  gap: 3
}

export const datePickerStyles: SxProps<Theme> = {
  height: '570px',
  marginTop: '4.9%',
  marginLeft: '24px'
}

export const layoutContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  height: '85vh'
}

export const autocompleteWrapperStyles: SxProps<Theme> = {
  display: 'flex',
  padding: '0px !important'
}

export const autocompleteStyles: SxProps<Theme> = {
  width: '80% !important'
}

export const addStudentsButtonStyles: SxProps<Theme> = {
  marginLeft: '16px'
}

export const actionsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
  mt: 2
}
