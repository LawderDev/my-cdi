import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { NavButton } from './components/NavButton'
import type { SidebarPresenterProps } from './types/SidebarPresenterProps'
import {
  LOGO_BG,
  LOGO_BORDER_RADIUS_PX,
  LOGO_FONT_SIZE_PX,
  LOGO_FONT_WEIGHT,
  LOGO_SHADOW,
  LOGO_SIZE_PX,
  SETTINGS_ICON_NAME,
  SETTINGS_LABEL_KEY,
  SIDEBAR_WIDTH_PX,
  SIDEBAR_Z_INDEX
} from './SidebarPresenter.styles'

export function SidebarPresenter({ navButtonNodes, onSettingsClick }: SidebarPresenterProps) {
  const { t } = useTranslation('common')

  return (
    <Box
      component="nav"
      sx={{
        width: `${SIDEBAR_WIDTH_PX}px`,
        bgcolor: 'var(--bg-nav)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 1.5,
        borderRight: '1px solid var(--border)',
        flexShrink: 0,
        position: 'relative',
        zIndex: SIDEBAR_Z_INDEX
      }}
    >
      <Box
        sx={{
          width: `${LOGO_SIZE_PX}px`,
          height: `${LOGO_SIZE_PX}px`,
          borderRadius: `${LOGO_BORDER_RADIUS_PX}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          fontWeight: LOGO_FONT_WEIGHT,
          fontSize: `${LOGO_FONT_SIZE_PX}px`,
          color: '#fff',
          letterSpacing: '-0.5px',
          background: LOGO_BG,
          boxShadow: LOGO_SHADOW
        }}
      >
        CDI
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          width: '100%',
          px: 1,
          flex: 1
        }}
      >
        {navButtonNodes}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: 1, pb: 0.5 }}>
        <NavButton
          active={false}
          iconName={SETTINGS_ICON_NAME}
          label={t(SETTINGS_LABEL_KEY)}
          onClick={onSettingsClick}
        />
      </Box>
    </Box>
  )
}
