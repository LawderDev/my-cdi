import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { Icon } from '@ui/components/Icon'
import { TYPE_SCALE } from '@ui/theme'

export const SORT_ICON_FONT_SIZE_PX = TYPE_SCALE.body1
export const CHECKBOX_CELL_WIDTH_PX = 40
export const ACTIONS_CELL_WIDTH_PX = 80
export const CHECKBOX_CELL_STYLE = { width: CHECKBOX_CELL_WIDTH_PX } as const
export const ACTIONS_CELL_STYLE = { width: ACTIONS_CELL_WIDTH_PX } as const

export const SortIcon = styled(Icon)(({ theme }) => ({
  fontSize: SORT_ICON_FONT_SIZE_PX,
  marginLeft: theme.spacing(0.25)
}))

export const StudentListLayout = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5)
}))
