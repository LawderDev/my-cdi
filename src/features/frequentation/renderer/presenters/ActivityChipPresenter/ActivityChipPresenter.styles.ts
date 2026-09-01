import Typography from '@mui/material/Typography'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { RADII, type ActivityTone } from '@ui/theme'

const DOT_SIZE_PX = 6
const TONE_BACKGROUND_ALPHA = 0.12

export const ChipRoot = styled(Typography, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $tone: ActivityTone }>(({ theme, $tone }) => {
  const toneColor = theme.palette.activity[$tone]
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    paddingInline: theme.spacing(1),
    paddingBlock: theme.spacing(0.25),
    borderRadius: RADII.small,
    backgroundColor: alpha(toneColor, TONE_BACKGROUND_ALPHA),
    color: toneColor
  }
})

export const ChipDot = styled('span', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $tone: ActivityTone }>(({ theme, $tone }) => ({
  width: `${DOT_SIZE_PX}px`,
  height: `${DOT_SIZE_PX}px`,
  borderRadius: '50%',
  display: 'inline-block',
  backgroundColor: theme.palette.activity[$tone]
}))
