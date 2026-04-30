import Box from '@mui/material/Box'
import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import type { ChartCardProps } from './types/ChartCardProps'

const TITLE_FONT_SIZE_PX = 13
const TITLE_FONT_WEIGHT = 600
const TITLE_ICON_FONT_SIZE_PX = 18

export function ChartCard({ titleIcon, title, children }: ChartCardProps) {
  return (
    <Card>
      <Box
        sx={{
          fontSize: `${TITLE_FONT_SIZE_PX}px`,
          fontWeight: TITLE_FONT_WEIGHT,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Icon
          name={titleIcon}
          style={{ fontSize: `${TITLE_ICON_FONT_SIZE_PX}px`, color: 'var(--accent)' }}
        />
        {title}
      </Box>
      {children}
    </Card>
  )
}
