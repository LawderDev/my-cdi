import { Routes, Route } from 'react-router'
import { ROUTES } from '@lib/routes'
import { AppShell } from '@ui/components/AppShell'
import { JournalPage } from '@frequentation/pages/JournalPage'
import { StudentsPage } from '@student/pages/StudentsPage'
import { StatisticsPage } from '@statistics/pages/StatisticsPage'
import { SettingsPage } from '@settings/pages/SettingsPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path={ROUTES.JOURNAL} element={<JournalPage />} />
        <Route path={ROUTES.STUDENTS} element={<StudentsPage />} />
        <Route path={ROUTES.STATISTICS} element={<StatisticsPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
