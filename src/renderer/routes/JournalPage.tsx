import { lazy } from 'react'

const JournalPageImpl = lazy(async () => {
  const mod = await import('@frequentation/pages/JournalPage')
  return { default: mod.JournalPage }
})

export default JournalPageImpl
