import MuiIconButton from '@mui/material/IconButton'
import { alpha, styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'
import type { IconButtonTone } from './types/IconButtonProps'
import { TINT_ALPHAS } from '@ui/theme'

const BUTTON_SIZE_PX = 36

export const IconButtonRoot = styled(MuiIconButton, {
  shouldForwardProp: shouldForwardStyledProp
})<{ $tone: IconButtonTone }>(({ theme, $tone }) => ({
  width: `${BUTTON_SIZE_PX}px`,
  height: `${BUTTON_SIZE_PX}px`,
  borderRadius: theme.shape.borderRadius,
  color: $tone === 'danger' ? theme.palette.error.main : theme.palette.text.disabled,
  fontSize: theme.typography.h6.fontSize,
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.shortest
  }),
  '& .material-icons-round': {
    fontSize: 'inherit'
  },
  '&:hover': {
    backgroundColor:
      $tone === 'danger'
        ? alpha(theme.palette.error.main, TINT_ALPHAS.surface)
        : theme.palette.background.paper,
    color: $tone === 'danger' ? theme.palette.error.main : theme.palette.text.primary
  }
}))
