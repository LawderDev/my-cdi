import { Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { ROUTES } from '@lib/routes'
import { AppShell } from '@ui/components/AppShell'
import JournalPage from './JournalPage'
import StudentsPage from './StudentsPage'
import StatisticsPage from './StatisticsPage'

function RouteSuspenseFallback() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent" />
    </div>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          path={ROUTES.JOURNAL}
          element={
            <Suspense fallback={<RouteSuspenseFallback />}>
              <JournalPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.STUDENTS}
          element={
            <Suspense fallback={<RouteSuspenseFallback />}>
              <StudentsPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.STATISTICS}
          element={
            <Suspense fallback={<RouteSuspenseFallback />}>
              <StatisticsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
