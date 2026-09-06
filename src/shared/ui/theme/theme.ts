import { alpha, createTheme, type PaletteOptions, type Theme } from '@mui/material/styles'
import { serializeThemePreference } from '@lib/themePreference'
import {
  DEFAULT_THEME_PREFERENCE,
  THEME_BACKGROUNDS,
  type ThemeAccent,
  type ThemeMode,
  type ThemePreference
} from '@types'

export const MONO_FONT_FAMILY = '"JetBrains Mono", ui-monospace, monospace'

const SANS_FONT_FAMILY = '"Inter", system-ui, -apple-system, sans-serif'

interface AccentColors {
  main: string
  light: string
  contrastText: string
  soft: string
}

export const ACCENT_COLORS: Record<ThemeAccent, Record<ThemeMode, AccentColors>> = {
  purple: {
    dark: { main: '#7c4dff', light: '#916fff', contrastText: '#ffffff', soft: '#c084fc' },
    light: { main: '#7c4dff', light: '#916fff', contrastText: '#ffffff', soft: '#8b5cf6' }
  },
  pink: {
    dark: { main: '#ec4899', light: '#f472b6', contrastText: '#ffffff', soft: '#f9a8d4' },
    light: { main: '#ec4899', light: '#f472b6', contrastText: '#ffffff', soft: '#db2777' }
  },
  blue: {
    dark: { main: '#3b82f6', light: '#60a5fa', contrastText: '#ffffff', soft: '#93c5fd' },
    light: { main: '#3b82f6', light: '#60a5fa', contrastText: '#ffffff', soft: '#1d4ed8' }
  },
  red: {
    dark: { main: '#ef4444', light: '#f87171', contrastText: '#ffffff', soft: '#fca5a5' },
    light: { main: '#ef4444', light: '#f87171', contrastText: '#ffffff', soft: '#b91c1c' }
  },
  yellow: {
    dark: { main: '#f59e0b', light: '#fbbf24', contrastText: '#1e293b', soft: '#fcd34d' },
    light: { main: '#f59e0b', light: '#fbbf24', contrastText: '#1e293b', soft: '#b45309' }
  }
}

interface ModeColors {
  sidebar: string
  surface: string
  card: string
  title: string
  text: string
  textDim: string
  border: string
  borderStrong: string
  info: string
  success: string
  warning: string
  danger: string
  softShadow: string
  largeShadow: string
}

const MODE_COLORS: Record<ThemeMode, ModeColors> = {
  dark: {
    sidebar: '#080f1e',
    surface: '#172033',
    card: '#1e293b',
    title: '#e2e8f0',
    text: '#94a3b8',
    textDim: '#64748b',
    border: '#334155',
    borderStrong: '#475569',
    info: '#60a5fa',
    success: '#4ade80',
    warning: '#fbbf24',
    danger: '#f87171',
    softShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
    largeShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
  },
  light: {
    sidebar: '#e2e8f0',
    surface: '#e8edf5',
    card: '#ffffff',
    title: '#0f172a',
    text: '#475569',
    textDim: '#64748b',
    border: '#cbd5e1',
    borderStrong: '#94a3b8',
    info: '#2563eb',
    success: '#16a34a',
    warning: '#d97706',
    danger: '#dc2626',
    softShadow: '0 2px 12px rgba(15, 23, 42, 0.12)',
    largeShadow: '0 8px 32px rgba(15, 23, 42, 0.18)'
  }
}

const BODY_FONT_SIZE_PX = 14
const LINE_HEIGHT = 1.5
const SCROLLBAR_WIDTH_PX = 6
const SCROLLBAR_THUMB_RADIUS_PX = 3
const BREAKPOINT_SM_PX = 600
const BREAKPOINT_MD_PX = 900
const BREAKPOINT_LG_PX = 1100
const BREAKPOINT_XL_PX = 1536

const LINE_HEIGHT_DISPLAY = 1.2
const ACCENT_GLOW_ALPHA = 0.35
const ACCENT_LARGE_GLOW_ALPHA = 0.4

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

function buildPaletteOptions(accent: ThemeAccent, mode: ThemeMode): PaletteOptions {
  const modeColors = MODE_COLORS[mode]
  const accentColors = ACCENT_COLORS[accent][mode]
  return {
    mode,
    primary: {
      main: accentColors.main,
      light: accentColors.light,
      contrastText: accentColors.contrastText
    },
    info: {
      main: modeColors.info
    },
    success: {
      main: modeColors.success
    },
    warning: {
      main: modeColors.warning
    },
    error: {
      main: modeColors.danger
    },
    background: {
      default: THEME_BACKGROUNDS[mode],
      paper: modeColors.card
    },
    text: {
      primary: modeColors.title,
      secondary: modeColors.text,
      disabled: modeColors.textDim
    },
    divider: modeColors.border,
    sidebar: modeColors.sidebar,
    surface: modeColors.surface,
    dividerStrong: modeColors.borderStrong,
    activity: {
      computer: modeColors.info,
      work: modeColors.success,
      reading: modeColors.warning,
      relaxation: accentColors.soft,
      game: modeColors.danger,
      other: modeColors.text
    }
  }
}

const THEME_CACHE = new Map<string, Theme>()

export function createAppTheme(preference: ThemePreference): Theme {
  const cacheKey = serializeThemePreference(preference)
  const cachedTheme = THEME_CACHE.get(cacheKey)
  if (cachedTheme) {
    return cachedTheme
  }
  const modeColors = MODE_COLORS[preference.mode]
  const accentColors = ACCENT_COLORS[preference.accent][preference.mode]
  const appTheme = createTheme({
    palette: buildPaletteOptions(preference.accent, preference.mode),
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
            background: modeColors.border,
            borderRadius: SCROLLBAR_THUMB_RADIUS_PX
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: modeColors.borderStrong
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
  appTheme.shadows[1] = modeColors.softShadow
  appTheme.shadows[2] = modeColors.largeShadow
  appTheme.shadows[3] = `0 2px 8px ${alpha(accentColors.main, ACCENT_GLOW_ALPHA)}`
  appTheme.shadows[4] = `0 4px 16px ${alpha(accentColors.main, ACCENT_LARGE_GLOW_ALPHA)}`

  THEME_CACHE.set(cacheKey, appTheme)
  return appTheme
}

export const theme = createAppTheme(DEFAULT_THEME_PREFERENCE)
