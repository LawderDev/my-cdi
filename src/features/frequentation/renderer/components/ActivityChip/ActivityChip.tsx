import Box from '@mui/material/Box'
import { getActivityCssClass } from '@frequentation/helpers/activityFormatters'
import type { ActivityType } from '@types'

interface ActivityChipProps {
  activity: ActivityType
  label: string
}

const FONT_SIZE_PX = 11
const FONT_WEIGHT = 500
const DOT_SIZE_PX = 6

export function ActivityChip({ activity, label }: ActivityChipProps) {
  const cssClass = getActivityCssClass(activity)
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
