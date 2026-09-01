import Box from '@mui/material/Box'
import { DOT_SIZE_PX, FONT_SIZE_PX, FONT_WEIGHT } from './ActivityChip.styles'

interface ActivityChipProps {
  cssClass: string
  label: string
}

export function ActivityChip({ cssClass, label }: ActivityChipProps) {
  return (
    <Box
      component="span"
      className={cssClass}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1,
        py: 0.25,
        borderRadius: 'var(--radius-xs)',
        fontSize: `${FONT_SIZE_PX}px`,
        fontWeight: FONT_WEIGHT
      }}
    >
      <Box
        component="span"
        className="act-dot"
        sx={{
          width: `${DOT_SIZE_PX}px`,
          height: `${DOT_SIZE_PX}px`,
          borderRadius: '50%',
          display: 'inline-block'
        }}
      />
      {label}
    </Box>
  )
}
