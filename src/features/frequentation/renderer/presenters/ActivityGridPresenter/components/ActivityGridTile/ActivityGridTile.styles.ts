import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import { FONT_WEIGHTS, RADII, type ActivityTone } from '@ui/theme'

const TONE_BACKGROUND_ALPHA = 0.12

export const TileButton = styled('button', {
  shouldForwardProp: shouldForwardStyledProp
})<{ $tone: ActivityTone; $isSelected: boolean }>(({ theme, $tone, $isSelected }) => {
  const toneColor = theme.palette.activity[$tone]
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    paddingInline: theme.spacing(1),
    paddingBlock: theme.spacing(1.5),
    border: '1px solid',
    borderColor: $isSelected ? toneColor : theme.palette.divider,
    borderRadius: RADII.small,
    cursor: 'pointer',
    transition: theme.transitions.create(['background-color', 'border-color', 'color']),
    fontSize: theme.typography.body2.fontSize,
    fontWeight: FONT_WEIGHTS.medium,
    userSelect: 'none',
    backgroundColor: $isSelected
      ? alpha(toneColor, TONE_BACKGROUND_ALPHA)
      : theme.palette.background.paper,
    color: $isSelected ? toneColor : theme.palette.text.secondary,
    '&:hover': {
      borderColor: $isSelected ? toneColor : theme.palette.dividerStrong,
      backgroundColor: $isSelected ? alpha(toneColor, TONE_BACKGROUND_ALPHA) : theme.palette.surface
    }
  }
})
