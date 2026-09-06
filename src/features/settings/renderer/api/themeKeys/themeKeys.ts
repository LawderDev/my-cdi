export const themeKeys = {
  all: ['theme'] as const,
  preference: () => [...themeKeys.all, 'preference'] as const
}
