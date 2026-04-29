export const ROUTES = {
  JOURNAL: '/',
  STUDENTS: '/students',
  STATISTICS: '/statistics'
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
