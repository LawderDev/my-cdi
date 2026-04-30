import { Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { ROUTES } from '@lib/routes'
import { AppShell } from '@ui/components/AppShell'
import JournalPage from './JournalPage'
import StudentsPage from './StudentsPage'
import StatisticsPage from './StatisticsPage'

function RouteSuspenseFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        p: 4
      }}
    >
      <CircularProgress color="primary" />
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
