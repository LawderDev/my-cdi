import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-nav': 'var(--bg-nav)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        surface: 'var(--surface)',
        title: 'var(--title)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-bg': 'var(--accent-bg)',
        'accent-border': 'var(--accent-border)',
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        warning: 'var(--warning)',
        'warning-bg': 'var(--warning-bg)',
        danger: 'var(--danger)',
        'danger-bg': 'var(--danger-bg)',
        border: 'var(--border)',
        'border-light': 'var(--border-light)'
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
        xs: 'var(--radius-xs)',
        lg: 'var(--radius-lg)'
      },
      boxShadow: {
        DEFAULT: 'var(--shadow)',
        lg: 'var(--shadow-lg)'
      },
      fontFamily: {
        sans: 'var(--font)',
        mono: 'var(--mono)'
      },
      spacing: {
        sidebar: 'var(--sidebar-w)',
        header: 'var(--header-h)'
      }
    }
  },
  plugins: []
}

export default config
