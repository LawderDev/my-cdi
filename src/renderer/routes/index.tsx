import { Routes, Route } from 'react-router'
import { ROUTES } from '@shared/lib/routes'
import { StudentsPage } from '@student/pages/StudentsPage'
import { JournalPage } from '@frequentation/pages/JournalPage'
import { Layout } from './Layout'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.JOURNAL} element={<JournalPage />} />
        <Route path={ROUTES.STUDENTS} element={<StudentsPage />} />
        <Route path={ROUTES.STATISTICS} element={<StatisticsPlaceholder />} />
      </Route>
    </Routes>
  )
}

function StatisticsPlaceholder() {
  return <div>Statistiques — en cours de développement</div>
}
