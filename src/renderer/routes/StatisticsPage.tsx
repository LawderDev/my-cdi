import { lazy } from 'react'

const StatisticsPageImpl = lazy(async () => {
  const mod = await import('@statistics/pages/StatisticsPage')
  return { default: mod.StatisticsPage }
})

export default StatisticsPageImpl
