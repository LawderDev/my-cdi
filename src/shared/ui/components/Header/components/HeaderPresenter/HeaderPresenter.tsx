import Box from '@mui/material/Box'
import type { HeaderPresenterProps } from './types/HeaderPresenterProps'
import {
  CLOCK_AREA_SX,
  CLOCK_SX,
  HEADER_SX,
  SUBTITLE_SX,
  TITLE_BLOCK_SX,
  TITLE_SX
} from './HeaderPresenter.styles'

export function HeaderPresenter({ title, subtitle, time }: HeaderPresenterProps) {
  return (
    <Box component="header" sx={HEADER_SX}>
      <Box sx={TITLE_BLOCK_SX}>
        <Box>
          <Box sx={TITLE_SX}>{title}</Box>
          <Box sx={SUBTITLE_SX}>{subtitle}</Box>
        </Box>
      </Box>
      <Box sx={CLOCK_AREA_SX}>
        <Box sx={CLOCK_SX}>{time}</Box>
      </Box>
    </Box>
  )
}
