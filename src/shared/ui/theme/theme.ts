import { alpha, createTheme } from '@mui/material/styles'

export const MONO_FONT_FAMILY = '"JetBrains Mono", ui-monospace, monospace'

const SANS_FONT_FAMILY = '"Inter", system-ui, -apple-system, sans-serif'

const ACCENT_COLOR = '#7c4dff'
const ACCENT_HOVER_COLOR = '#916fff'
const BG_COLOR = '#0f172a'
const SIDEBAR_COLOR = '#080f1e'
const SURFACE_COLOR = '#172033'
const CARD_COLOR = '#1e293b'
const TITLE_COLOR = '#e2e8f0'
const TEXT_COLOR = '#94a3b8'
const TEXT_DIM_COLOR = '#64748b'
const BORDER_COLOR = '#334155'
const BORDER_STRONG_COLOR = '#475569'
const INFO_COLOR = '#60a5fa'
const SUCCESS_COLOR = '#4ade80'
const WARNING_COLOR = '#fbbf24'
const DANGER_COLOR = '#f87171'
const RELAXATION_COLOR = '#c084fc'

const BODY_FONT_SIZE_PX = 14
const LINE_HEIGHT = 1.5
const SCROLLBAR_WIDTH_PX = 6
const SCROLLBAR_THUMB_RADIUS_PX = 3
const BREAKPOINT_SM_PX = 600
const BREAKPOINT_MD_PX = 900
const BREAKPOINT_LG_PX = 1100
const BREAKPOINT_XL_PX = 1536

const LINE_HEIGHT_DISPLAY = 1.2
const GLOW_ALPHA = 0.35
const LARGE_GLOW_ALPHA = 0.4

const SOFT_SHADOW = '0 2px 12px rgba(0, 0, 0, 0.3)'
const LARGE_SHADOW = '0 8px 32px rgba(0, 0, 0, 0.4)'
const ACCENT_GLOW_SHADOW = `0 2px 8px ${alpha(ACCENT_COLOR, GLOW_ALPHA)}`
const ACCENT_LARGE_GLOW_SHADOW = `0 4px 16px ${alpha(ACCENT_COLOR, LARGE_GLOW_ALPHA)}`

export type ActivityTone = 'computer' | 'work' | 'reading' | 'relaxation' | 'game' | 'other'

/**
 * Numeric design tokens shared with non-CSS consumers (charts, icon sizing).
 * The `typography` variants below are built from this scale — always add new
 * sizes here, never inline px in components.
 */
const CAPTION_FONT_SIZE_PX = 11
const BODY_SMALL_FONT_SIZE_PX = 12
const BODY_FONT_SIZE_PX_SMALL = 13
const SUBTITLE_SMALL_FONT_SIZE_PX = 14
const SUBTITLE_FONT_SIZE_PX = 16
const H6_FONT_SIZE_PX = 18
const H5_FONT_SIZE_PX = 20
const H4_FONT_SIZE_PX = 28
const DISPLAY_FONT_SIZE_PX = 40
const HERO_FONT_SIZE_PX = 48

export const TYPE_SCALE = {
  caption: CAPTION_FONT_SIZE_PX,
  body2: BODY_SMALL_FONT_SIZE_PX,
  body1: BODY_FONT_SIZE_PX_SMALL,
  subtitle2: SUBTITLE_SMALL_FONT_SIZE_PX,
  subtitle1: SUBTITLE_FONT_SIZE_PX,
  h6: H6_FONT_SIZE_PX,
  h5: H5_FONT_SIZE_PX,
  h4: H4_FONT_SIZE_PX,
  h3: DISPLAY_FONT_SIZE_PX,
  h2: HERO_FONT_SIZE_PX
} as const

const FONT_WEIGHT_MEDIUM_VALUE = 500
const FONT_WEIGHT_SEMIBOLD_VALUE = 600
const FONT_WEIGHT_BOLD_VALUE = 700

export const FONT_WEIGHTS = {
  medium: FONT_WEIGHT_MEDIUM_VALUE,
  semibold: FONT_WEIGHT_SEMIBOLD_VALUE,
  bold: FONT_WEIGHT_BOLD_VALUE
} as const

const BORDER_RADIUS_PX = 12
const SMALL_BORDER_RADIUS_PX = BORDER_RADIUS_PX / 2

export const RADII = {
  base: BORDER_RADIUS_PX,
  small: SMALL_BORDER_RADIUS_PX
} as const

/** Standard control heights: `md` for toolbars/forms/dialogs, `sm` for dense panel headers. */
const CONTROL_HEIGHT_MD_PX = 40
const CONTROL_HEIGHT_SM_PX = 30

export const CONTROL_HEIGHTS = {
  md: CONTROL_HEIGHT_MD_PX,
  sm: CONTROL_HEIGHT_SM_PX
} as const

/** Alpha steps for tinted surfaces derived from palette colors. */
const TINT_ALPHA_VALUE = 0.1
const TINT_HOVER_ALPHA_VALUE = 0.2
const TINT_BORDER_ALPHA_VALUE = 0.25

export const TINT_ALPHAS = {
  surface: TINT_ALPHA_VALUE,
  hover: TINT_HOVER_ALPHA_VALUE,
  border: TINT_BORDER_ALPHA_VALUE
} as const

declare module '@mui/material/styles' {
  interface Palette {
    /** Nav shell background, darker than `background.default`. */
    sidebar: string
    /** Subtle elevated bands: table headers, hover rows, inline chips. */
    surface: string
    /** Emphasised border for interactive outlines. */
    dividerStrong: string
    /** Per-activity accent colors, shared by chips, tiles and charts. */
    activity: Record<ActivityTone, string>
  }

  interface PaletteOptions {
    sidebar?: string
    surface?: string
    dividerStrong?: string
    activity?: Record<ActivityTone, string>
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: ACCENT_COLOR,
      light: ACCENT_HOVER_COLOR
    },
    info: {
      main: INFO_COLOR
    },
    success: {
      main: SUCCESS_COLOR
    },
    warning: {
      main: WARNING_COLOR
    },
    error: {
      main: DANGER_COLOR
    },
    background: {
      default: BG_COLOR,
      paper: CARD_COLOR
    },
    text: {
      primary: TITLE_COLOR,
      secondary: TEXT_COLOR,
      disabled: TEXT_DIM_COLOR
    },
    divider: BORDER_COLOR,
    sidebar: SIDEBAR_COLOR,
    surface: SURFACE_COLOR,
    dividerStrong: BORDER_STRONG_COLOR,
    activity: {
      computer: INFO_COLOR,
      work: SUCCESS_COLOR,
      reading: WARNING_COLOR,
      relaxation: RELAXATION_COLOR,
      game: DANGER_COLOR,
      other: TEXT_COLOR
    }
  },
  typography: {
    fontFamily: SANS_FONT_FAMILY,
    overline: {
      fontSize: TYPE_SCALE.caption,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHT,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    },
    caption: {
      fontSize: TYPE_SCALE.caption,
      fontWeight: FONT_WEIGHTS.medium,
      lineHeight: LINE_HEIGHT
    },
    body2: {
      fontSize: TYPE_SCALE.body2,
      fontWeight: FONT_WEIGHTS.medium,
      lineHeight: LINE_HEIGHT
    },
    body1: {
      fontSize: TYPE_SCALE.body1,
      lineHeight: LINE_HEIGHT
    },
    subtitle2: {
      fontSize: TYPE_SCALE.subtitle2,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHT
    },
    subtitle1: {
      fontSize: TYPE_SCALE.subtitle1,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHT
    },
    h6: {
      fontSize: TYPE_SCALE.h6,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHT
    },
    h5: {
      fontSize: TYPE_SCALE.h5,
      fontWeight: FONT_WEIGHTS.semibold,
      lineHeight: LINE_HEIGHT
    },
    h4: {
      fontSize: TYPE_SCALE.h4,
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHT
    },
    h3: {
      fontSize: TYPE_SCALE.h3,
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHT_DISPLAY
    },
    h2: {
      fontSize: TYPE_SCALE.h2,
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHT_DISPLAY
    },
    h1: {
      fontSize: TYPE_SCALE.h2,
      fontWeight: FONT_WEIGHTS.bold,
      lineHeight: LINE_HEIGHT_DISPLAY
    },
    button: {
      textTransform: 'none',
      fontWeight: FONT_WEIGHTS.medium,
      fontSize: TYPE_SCALE.subtitle2
    }
  },
  shape: {
    borderRadius: BORDER_RADIUS_PX
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: BREAKPOINT_SM_PX,
      md: BREAKPOINT_MD_PX,
      lg: BREAKPOINT_LG_PX,
      xl: BREAKPOINT_XL_PX
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          height: '100%',
          margin: 0
        },
        body: {
          fontFamily: SANS_FONT_FAMILY,
          fontSize: BODY_FONT_SIZE_PX,
          lineHeight: LINE_HEIGHT,
          WebkitFontSmoothing: 'antialiased'
        },
        '#root': {
          height: '100%',
          overflow: 'hidden'
        },
        button: {
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          font: 'inherit',
          color: 'inherit'
        },
        'input, select, textarea': {
          font: 'inherit',
          color: 'inherit'
        },
        '*::-webkit-scrollbar': {
          width: SCROLLBAR_WIDTH_PX
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent'
        },
        '*::-webkit-scrollbar-thumb': {
          background: BORDER_COLOR,
          borderRadius: SCROLLBAR_THUMB_RADIUS_PX
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: BORDER_STRONG_COLOR
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

// Elevation ramp: 1 = soft card shadow, 2 = large modal shadow,
// 3/4 = accent glow for emphasized primary elements.
theme.shadows[1] = SOFT_SHADOW
theme.shadows[2] = LARGE_SHADOW
theme.shadows[3] = ACCENT_GLOW_SHADOW
theme.shadows[4] = ACCENT_LARGE_GLOW_SHADOW
