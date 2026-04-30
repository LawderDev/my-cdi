import { lazy } from 'react'

const StudentsPageImpl = lazy(async () => {
  const mod = await import('@student/pages/StudentsPage')
  return { default: mod.StudentsPage }
})

export default StudentsPageImpl
