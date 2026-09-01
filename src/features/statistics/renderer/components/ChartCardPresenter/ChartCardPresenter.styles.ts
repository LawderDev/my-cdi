import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const TITLE_FONT_SIZE_PX = 13
export const TITLE_FONT_WEIGHT = 600
export const TITLE_ICON_FONT_SIZE_PX = 18

export const ChartCardTitle = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  fontSize: `${TITLE_FONT_SIZE_PX}px`,
  fontWeight: TITLE_FONT_WEIGHT,
  mb: 2,
  display: 'flex',
  alignItems: 'center',
  gap: 1
})
