import { describe, it, expect } from 'vitest'
import { svgArc } from '../svgArc'

const CX = 70
const CY = 70
const OUTER_R = 55
const INNER_R = 38
const START_ANGLE = -90
const SMALL_END_ANGLE = 0
const LARGE_END_ANGLE = 180

describe('svgArc', () => {
  it('starts the path with a Move command at the outer radius', () => {
    const path = svgArc({
      cx: CX,
      cy: CY,
      outerR: OUTER_R,
      innerR: INNER_R,
      startAngleDeg: START_ANGLE,
      endAngleDeg: SMALL_END_ANGLE
    })
    expect(path.startsWith('M')).toBe(true)
  })

  it('uses the small-arc flag (0) for slices smaller than 180 degrees', () => {
    const path = svgArc({
      cx: CX,
      cy: CY,
      outerR: OUTER_R,
      innerR: INNER_R,
      startAngleDeg: START_ANGLE,
      endAngleDeg: SMALL_END_ANGLE
    })
    expect(path).toContain('A55,55 0 0 1')
  })

  it('uses the large-arc flag (1) for slices larger than 180 degrees', () => {
    const path = svgArc({
      cx: CX,
      cy: CY,
      outerR: OUTER_R,
      innerR: INNER_R,
      startAngleDeg: START_ANGLE,
      endAngleDeg: LARGE_END_ANGLE
    })
    expect(path).toContain('A55,55 0 1 1')
  })

  it('closes the path with the inner radius arc and Z', () => {
    const path = svgArc({
      cx: CX,
      cy: CY,
      outerR: OUTER_R,
      innerR: INNER_R,
      startAngleDeg: START_ANGLE,
      endAngleDeg: SMALL_END_ANGLE
    })
    expect(path).toContain('A38,38 0 0 0')
    expect(path.endsWith('Z')).toBe(true)
  })
})
