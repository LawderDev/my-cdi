import type { DailyCountDto } from '@statistics-shared'

export interface TrendDimensions {
  width: number
  height: number
  paddingTop: number
  paddingRight: number
  paddingBottom: number
  paddingLeft: number
}

export interface TrendDot {
  cx: number
  cy: number
}

export interface TrendYLabel {
  y: number
  label: number
}

export interface TrendPath {
  path: string
  areaPath: string
  dots: TrendDot[]
  yLabels: TrendYLabel[]
  viewBox: string
}

const RANGE_PADDING_HIGH = 1.1
const RANGE_PADDING_LOW = 0.8
const HALF_DIVISOR = 2
const Y_LABEL_X_OFFSET = 6
const EMPTY_PATH: TrendPath = {
  path: '',
  areaPath: '',
  dots: [],
  yLabels: [],
  viewBox: '0 0 0 0'
}

const DEFAULT_WIDTH = 700
const DEFAULT_HEIGHT = 200
const DEFAULT_PADDING_VERTICAL = 10
const DEFAULT_PADDING_BOTTOM = 30
const DEFAULT_PADDING_LEFT = 40

export const DEFAULT_TREND_DIMENSIONS: TrendDimensions = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  paddingTop: DEFAULT_PADDING_VERTICAL,
  paddingRight: DEFAULT_PADDING_VERTICAL,
  paddingBottom: DEFAULT_PADDING_BOTTOM,
  paddingLeft: DEFAULT_PADDING_LEFT
}

export function buildTrendPath(
  dailyCounts: DailyCountDto[],
  dimensions: TrendDimensions = DEFAULT_TREND_DIMENSIONS
): TrendPath {
  if (dailyCounts.length === 0) {
    return EMPTY_PATH
  }
  const sorted = [...dailyCounts].sort((left, right) => (left.date < right.date ? -1 : 1))
  const values = sorted.map((item) => item.count)
  const rawMax = Math.max(...values)
  const rawMin = Math.min(...values)
  const max = rawMax === 0 ? 1 : rawMax * RANGE_PADDING_HIGH
  const min = rawMin * RANGE_PADDING_LOW
  const range = max - min === 0 ? 1 : max - min
  const innerWidth = dimensions.width - dimensions.paddingLeft - dimensions.paddingRight
  const innerHeight = dimensions.height - dimensions.paddingTop - dimensions.paddingBottom
  const stepX = sorted.length > 1 ? innerWidth / (sorted.length - 1) : innerWidth
  const dots: TrendDot[] = sorted.map((item, index) => {
    const cx = dimensions.paddingLeft + index * stepX
    const ratio = (item.count - min) / range
    const cy = dimensions.paddingTop + (1 - ratio) * innerHeight
    return { cx, cy }
  })
  const path = `M${dots.map((dot) => `${dot.cx},${dot.cy}`).join(' L')}`
  const baseY = dimensions.height - dimensions.paddingBottom
  const lastX = dimensions.paddingLeft + (sorted.length - 1) * stepX
  const areaPath = `${path} L${lastX},${baseY} L${dimensions.paddingLeft},${baseY} Z`
  const midLabel = (rawMin + rawMax) / HALF_DIVISOR
  const yLabelValues = [Math.round(rawMin), Math.round(midLabel), Math.round(rawMax)]
  const yLabels = yLabelValues.map((label) => {
    const ratio = (label - min) / range
    return {
      label,
      y: dimensions.paddingTop + (1 - ratio) * innerHeight
    }
  })
  return {
    path,
    areaPath,
    dots,
    yLabels,
    viewBox: `0 0 ${dimensions.width} ${dimensions.height}`
  }
}

export const Y_LABEL_OFFSET_X = Y_LABEL_X_OFFSET
