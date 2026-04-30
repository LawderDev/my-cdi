export interface SvgArcInput {
  cx: number
  cy: number
  outerR: number
  innerR: number
  startAngleDeg: number
  endAngleDeg: number
}

const HALF_CIRCLE = 180
const FULL_CIRCLE_THRESHOLD = 180

function toRad(deg: number): number {
  return (deg * Math.PI) / HALF_CIRCLE
}

export function svgArc({
  cx,
  cy,
  outerR,
  innerR,
  startAngleDeg,
  endAngleDeg
}: SvgArcInput): string {
  const startRad = toRad(startAngleDeg)
  const endRad = toRad(endAngleDeg)

  const x1 = cx + outerR * Math.cos(startRad)
  const y1 = cy + outerR * Math.sin(startRad)
  const x2 = cx + outerR * Math.cos(endRad)
  const y2 = cy + outerR * Math.sin(endRad)
  const ix1 = cx + innerR * Math.cos(endRad)
  const iy1 = cy + innerR * Math.sin(endRad)
  const ix2 = cx + innerR * Math.cos(startRad)
  const iy2 = cy + innerR * Math.sin(startRad)

  const sweep = endAngleDeg - startAngleDeg
  const large = sweep > FULL_CIRCLE_THRESHOLD ? 1 : 0

  return `M${x1},${y1} A${outerR},${outerR} 0 ${large} 1 ${x2},${y2} L${ix1},${iy1} A${innerR},${innerR} 0 ${large} 0 ${ix2},${iy2} Z`
}
