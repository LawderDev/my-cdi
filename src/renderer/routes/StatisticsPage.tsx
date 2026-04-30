import { lazy } from 'react'

const StatisticsPageImpl = lazy(async () => {
  const mod = await import('@ui/components/StatisticsPagePlaceholder')
  return { default: mod.StatisticsPagePlaceholder }
})

export default StatisticsPageImpl
