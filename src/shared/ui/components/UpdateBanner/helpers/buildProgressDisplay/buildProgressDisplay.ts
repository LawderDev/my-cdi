const FALLBACK_PROGRESS_PERCENT = 0
const PERCENT_MAX = 100
const PROGRESS_PERCENT_DECIMAL_DIGITS = 0

export interface ProgressDisplay {
  fillPercent: number
  percentDisplay: string
}

export function buildProgressDisplay(progressPercent?: number): ProgressDisplay {
  const percent = progressPercent ?? FALLBACK_PROGRESS_PERCENT
  return {
    fillPercent: Math.min(percent, PERCENT_MAX),
    percentDisplay: percent.toFixed(PROGRESS_PERCENT_DECIMAL_DIGITS)
  }
}
