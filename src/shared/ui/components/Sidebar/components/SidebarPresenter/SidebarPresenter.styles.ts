import Box from '@mui/material/Box'
import { styled } from '@ui/helpers/styled'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const SIDEBAR_WIDTH_PX = 68
const LOGO_SIZE_PX = 36
const LOGO_FONT_SIZE_PX = 13
const LOGO_BORDER_RADIUS_PX = 10
const LOGO_FONT_WEIGHT = 700
const LOGO_BG = 'linear-gradient(135deg, var(--accent), #b388ff)'
const LOGO_SHADOW = '0 2px 8px rgba(var(--accent-rgb), 0.4)'
const SIDEBAR_Z_INDEX = 10

export const SETTINGS_ICON_NAME = 'settings'
export const SETTINGS_LABEL_KEY = 'nav.settings'

export const SidebarRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
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
})

export const Logo = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
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
})

export const NavList = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  width: '100%',
  px: 1,
  flex: 1
})

export const FooterList = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})({
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  px: 1,
  pb: 0.5
})
