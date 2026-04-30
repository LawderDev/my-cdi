import type { ActivityCountDto } from '@statistics-shared'
import type { ActivityType } from '@types'
import { svgArc } from '@statistics/helpers/svgArc'
import { getActivityColor } from '@frequentation/helpers/activityFormatters'

export interface DonutSlice {
  d: string
  color: string
  activity: ActivityType
  value: number
}

export interface DonutGeometry {
  cx: number
  cy: number
  outerR: number
  innerR: number
}

const CENTER_X = 70
const CENTER_Y = 70
const OUTER_RADIUS = 55
const INNER_RADIUS = 38
const DEFAULT_GEOMETRY: DonutGeometry = {
  cx: CENTER_X,
  cy: CENTER_Y,
  outerR: OUTER_RADIUS,
  innerR: INNER_RADIUS
}
const FULL_CIRCLE_DEG = 360
const START_ANGLE_DEG = -90

export function buildDonutSlices(
  activityCounts: ActivityCountDto[],
  geometry: DonutGeometry = DEFAULT_GEOMETRY
): DonutSlice[] {
  const total = activityCounts.reduce((sum, item) => sum + item.count, 0)
  if (total === 0) {
    return []
  }
  let cumulativeAngle = START_ANGLE_DEG
  const slices: DonutSlice[] = []
  for (const item of activityCounts) {
    const sweep = (item.count / total) * FULL_CIRCLE_DEG
    const endAngle = cumulativeAngle + sweep
    slices.push({
      d: svgArc({
        cx: geometry.cx,
        cy: geometry.cy,
        outerR: geometry.outerR,
        innerR: geometry.innerR,
        startAngleDeg: cumulativeAngle,
        endAngleDeg: endAngle
      }),
      color: getActivityColor(item.activity),
      activity: item.activity,
      value: item.count
    })
    cumulativeAngle = endAngle
  }
  return slices
}
