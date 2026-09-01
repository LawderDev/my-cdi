import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { shouldForwardStyledProp } from '@ui/helpers/shouldForwardStyledProp'

const SIDEBAR_WIDTH_PX = 68
const LOGO_SIZE_PX = 36
const LOGO_BORDER_RADIUS_PX = 10
const SIDEBAR_Z_INDEX = 10

export const SETTINGS_ICON_NAME = 'settings'
export const SETTINGS_LABEL_KEY = 'nav.settings'

export const SidebarRoot = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  width: `${SIDEBAR_WIDTH_PX}px`,
  backgroundColor: theme.palette.sidebar,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBlock: theme.spacing(1.5),
  borderRight: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
  position: 'relative',
  zIndex: SIDEBAR_Z_INDEX
}))

export const Logo = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  width: `${LOGO_SIZE_PX}px`,
  height: `${LOGO_SIZE_PX}px`,
  borderRadius: `${LOGO_BORDER_RADIUS_PX}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.common.white,
  letterSpacing: '-0.5px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  boxShadow: theme.shadows[3]
}))

export const NavList = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  width: '100%',
  paddingInline: theme.spacing(1),
  flex: 1
}))

export const FooterList = styled(Box, {
  shouldForwardProp: shouldForwardStyledProp
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  paddingInline: theme.spacing(1),
  paddingBottom: theme.spacing(0.5)
}))
