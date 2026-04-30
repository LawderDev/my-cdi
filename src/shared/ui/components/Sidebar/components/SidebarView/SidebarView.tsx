import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import { Icon } from '../../../Icon'
import type { SidebarViewProps } from './types/SidebarViewProps'

const SIDEBAR_WIDTH_PX = 68
const LOGO_SIZE_PX = 36
const LOGO_FONT_SIZE_PX = 13
const LOGO_BORDER_RADIUS_PX = 10
const LOGO_FONT_WEIGHT = 700

const NAV_BTN_WIDTH_PX = 52
const NAV_BTN_HEIGHT_PX = 48

const ACTIVE_BAR_WIDTH_PX = 3
const ACTIVE_BAR_HEIGHT_PX = 20
const ACTIVE_BAR_LEFT_PX = -8
const ACTIVE_BAR_BORDER_RADIUS = '0 3px 3px 0'

const ICON_FONT_SIZE_PX = 22

const SETTINGS_ICON_NAME = 'settings'
const SETTINGS_LABEL_KEY = 'nav.settings'

const LOGO_BG = 'linear-gradient(135deg, var(--accent), #b388ff)'
const LOGO_SHADOW = '0 2px 8px rgba(var(--accent-rgb), 0.4)'

const TRANSITION = 'all 0.2s'

const SIDEBAR_Z_INDEX = 10

interface NavButtonProps {
  active: boolean
  iconName: string
  label: string
  ariaCurrent?: 'page'
  onClick: () => void
}

function NavButton({ active, iconName, label, ariaCurrent, onClick }: NavButtonProps) {
  return (
    <Box
      component="button"
      type="button"
      title={label}
      aria-label={label}
      aria-current={ariaCurrent}
      onClick={onClick}
      sx={{
        position: 'relative',
        width: `${NAV_BTN_WIDTH_PX}px`,
        height: `${NAV_BTN_HEIGHT_PX}px`,
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: TRANSITION,
        bgcolor: active ? 'var(--accent-bg)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--text-dim)',
        '&:hover': {
          bgcolor: active ? 'var(--accent-bg)' : 'var(--card)',
          color: active ? 'var(--accent)' : 'var(--text)'
        },
        ...(active
          ? {
              '&::before': {
                content: '""',
                position: 'absolute',
                left: `${ACTIVE_BAR_LEFT_PX}px`,
                top: '50%',
                transform: 'translateY(-50%)',
                width: `${ACTIVE_BAR_WIDTH_PX}px`,
                height: `${ACTIVE_BAR_HEIGHT_PX}px`,
                bgcolor: 'var(--accent)',
                borderRadius: ACTIVE_BAR_BORDER_RADIUS
              }
            }
          : {})
      }}
    >
      <Icon name={iconName} style={{ fontSize: `${ICON_FONT_SIZE_PX}px` }} />
    </Box>
  )
}

export function SidebarView({ items, activePath, onNavigate, onSettingsClick }: SidebarViewProps) {
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
        {items.map((item) => {
          const isActive = item.path === activePath
          const label = t(item.labelKey)
          return (
            <NavButton
              key={item.path}
              active={isActive}
              iconName={item.iconName}
              label={label}
              ariaCurrent={isActive ? 'page' : undefined}
              onClick={() => onNavigate(item.path)}
            />
          )
        })}
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
