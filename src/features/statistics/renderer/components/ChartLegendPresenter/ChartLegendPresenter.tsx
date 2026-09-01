import { ChartLegendRoot } from './ChartLegendPresenter.styles'
import type { ChartLegendPresenterProps } from './types/ChartLegendPresenterProps'

export function ChartLegendPresenter({ legendNodes }: ChartLegendPresenterProps) {
  return <ChartLegendRoot>{legendNodes}</ChartLegendRoot>
}
