import { Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { CircularProgress, Box } from '@mui/material'
import { ROUTES } from '@lib/routes'
import { AppShell } from '@ui/components/AppShell'
import JournalPage from './JournalPage'
import StudentsPage from './StudentsPage'
import StatisticsPage from './StatisticsPage'

const FALLBACK_PADDING = 4

function RouteSuspenseFallback() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: FALLBACK_PADDING }}>
      <CircularProgress />
    </Box>
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
