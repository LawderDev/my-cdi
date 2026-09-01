import { Suspense } from 'react'
import type { ReactNode } from 'react'
import { Routes, Route } from 'react-router'
import { ROUTES } from '@lib/routes'
import { AppShell } from '@ui/components/AppShell'
import { RouteSuspenseFallback } from './RouteSuspenseFallback'
import JournalPage from './JournalPage'
import StudentsPage from './StudentsPage'
import StatisticsPage from './StatisticsPage'

function SuspenseRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteSuspenseFallback />}>{children}</Suspense>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          path={ROUTES.JOURNAL}
          element={
            <SuspenseRoute>
              <JournalPage />
            </SuspenseRoute>
          }
        />
        <Route
          path={ROUTES.STUDENTS}
          element={
            <SuspenseRoute>
              <StudentsPage />
            </SuspenseRoute>
          }
        />
        <Route
          path={ROUTES.STATISTICS}
          element={
            <SuspenseRoute>
              <StatisticsPage />
            </SuspenseRoute>
          }
        />
      </Route>
    </Routes>
  )
}
