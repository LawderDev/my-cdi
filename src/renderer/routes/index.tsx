import { Routes, Route } from 'react-router'
import { ROUTES } from '@shared/lib/routes'
import { StudentsPage } from '@student/pages/StudentsPage'
import { Layout } from './Layout'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.JOURNAL} element={<JournalPlaceholder />} />
        <Route path={ROUTES.STUDENTS} element={<StudentsPage />} />
        <Route path={ROUTES.STATISTICS} element={<StatisticsPlaceholder />} />
      </Route>
    </Routes>
  )
}

function JournalPlaceholder() {
  return <div>Journal — à implémenter</div>
}

function StatisticsPlaceholder() {
  return <div>Statistiques — en cours de développement</div>
}
