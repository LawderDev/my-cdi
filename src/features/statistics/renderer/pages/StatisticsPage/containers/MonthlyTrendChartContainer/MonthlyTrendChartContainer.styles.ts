import Box from '@mui/material/Box'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

export const CHART_HEIGHT_PX = 200
export const ACCENT_COLOR = '#7C4DFF'
export const DOT_RADIUS = 3
export const STROKE_WIDTH = 2
export const Y_LABEL_TEXT_OFFSET = 4
export const GRADIENT_OPACITY_TOP = 0.3
export const Y_LABEL_FONT_SIZE = 10
export const DASH_PATTERN = '4,4'

export const ChartArea = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  position: 'relative',
  height: `${CHART_HEIGHT_PX}px`
})

export const ChartSvg = styled('svg', {
  shouldForwardProp: shouldForwardStyledProp
})({
  width: '100%',
  height: '100%'
})
