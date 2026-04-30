import { createTheme } from '@mui/material/styles'

export const MONO_FONT_FAMILY = '"JetBrains Mono", ui-monospace, monospace'

const SANS_FONT_FAMILY = '"Inter", system-ui, -apple-system, sans-serif'

const BORDER_RADIUS_PX = 12
const BODY_FONT_SIZE_PX = 14
const BODY_LINE_HEIGHT = 1.5
const BUTTON_FONT_WEIGHT_MEDIUM = 500

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff'
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b'
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8'
    },
    divider: '#334155',
    success: {
      main: '#4ade80'
    },
    warning: {
      main: '#fbbf24'
    },
    error: {
      main: '#f87171'
    }
  },
  typography: {
    fontFamily: SANS_FONT_FAMILY
  },
  shape: {
    borderRadius: BORDER_RADIUS_PX
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: SANS_FONT_FAMILY,
          fontSize: BODY_FONT_SIZE_PX,
          lineHeight: BODY_LINE_HEIGHT,
          WebkitFontSmoothing: 'antialiased'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: BUTTON_FONT_WEIGHT_MEDIUM
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
})
