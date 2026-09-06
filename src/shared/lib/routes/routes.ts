export const ROUTES = {
  JOURNAL: '/',
  STUDENTS: '/students',
  STATISTICS: '/statistics',
  SETTINGS: '/settings'
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
