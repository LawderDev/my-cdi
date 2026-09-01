import Box from '@mui/material/Box'
import { Card } from '@ui/components/Card'
import { Icon } from '@ui/components/Icon'
import {
  TITLE_FONT_SIZE_PX,
  TITLE_FONT_WEIGHT,
  TITLE_ICON_FONT_SIZE_PX
} from './ChartCardPresenter.styles'
import type { ChartCardPresenterProps } from './types/ChartCardPresenterProps'

export function ChartCardPresenter({ titleIcon, title, children }: ChartCardPresenterProps) {
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
