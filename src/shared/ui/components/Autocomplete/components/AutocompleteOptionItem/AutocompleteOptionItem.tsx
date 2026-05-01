import Box from '@mui/material/Box'
import type { AutocompleteOptionItemProps } from './types/AutocompleteOptionItemProps'
import { BADGE_PY_SPACING, OPTION_GAP_SPACING } from './AutocompleteOptionItem.styles'

export function AutocompleteOptionItem({ option, ...props }: AutocompleteOptionItemProps) {
  return (
    <Box
      component="li"
      {...props}
      sx={{ display: 'flex', alignItems: 'center', gap: OPTION_GAP_SPACING }}
    >
      <span>{option.label}</span>
      {option.badge ? (
        <Box
          component="span"
          sx={{
            ml: 'auto',
            fontSize: '11px',
            color: 'var(--text-dim)',
            backgroundColor: 'var(--surface)',
            px: 1,
            py: BADGE_PY_SPACING,
            borderRadius: 'var(--radius-xs)'
          }}
        >
          {option.badge}
        </Box>
      ) : null}
    </Box>
  )
}
