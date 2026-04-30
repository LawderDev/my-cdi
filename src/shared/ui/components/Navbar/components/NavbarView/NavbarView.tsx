import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AppVersion } from '../../../AppVersion'
import type { NavbarViewProps } from './types/NavbarViewProps'

const TOOLBAR_GAP = 2
const ITEMS_GAP = 1

export function NavbarView({ items, activePath, onNavigate }: NavbarViewProps) {
  const { t } = useTranslation('common')
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ gap: TOOLBAR_GAP }}>
        <Typography variant="h6" component="div" sx={{ flexShrink: 0 }}>
          {t('app.title')}
        </Typography>
        <Box sx={{ display: 'flex', gap: ITEMS_GAP, flexGrow: 1 }}>
          {items.map((item) => {
            const isActive = item.path === activePath
            return (
              <Button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                color={isActive ? 'primary' : 'inherit'}
                variant={isActive ? 'contained' : 'text'}
                aria-current={isActive ? 'page' : undefined}
              >
                {t(item.labelKey)}
              </Button>
            )
          })}
        </Box>
        <AppVersion />
      </Toolbar>
    </AppBar>
  )
}
