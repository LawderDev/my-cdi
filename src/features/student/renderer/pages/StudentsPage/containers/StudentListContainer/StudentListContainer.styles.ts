import Box from '@mui/material/Box'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const SORT_ICON_FONT_SIZE_PX = 13
export const CHECKBOX_CELL_WIDTH_PX = 40
export const ACTIONS_CELL_WIDTH_PX = 80
export const CHECKBOX_CELL_STYLE = { width: CHECKBOX_CELL_WIDTH_PX } as const
export const ACTIONS_CELL_STYLE = { width: ACTIONS_CELL_WIDTH_PX } as const
export const SORT_ICON_STYLE = {
  fontSize: `${SORT_ICON_FONT_SIZE_PX}px`,
  marginLeft: '2px'
} as const

export const StudentListLayout = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5
})
