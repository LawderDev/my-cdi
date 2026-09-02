export interface BuildErrorReportInput {
  fileName: string
  created: number
  updated: number
  errorLines: string[]
  translate: (key: string, options?: Record<string, unknown>) => string
}

const ERROR_LINE_PREFIX = '- '

/**
 * Builds the plain-text error report for a CSV import: a title, the source
 * file, a result summary, and one translated line per failed student.
 */
export function buildErrorReport(input: BuildErrorReportInput): string {
  const { fileName, created, updated, errorLines, translate } = input
  const lines = [
    translate('csvImport.reportTitle'),
    fileName,
    translate('csvImport.summary', { count: created, updated, errors: errorLines.length }),
    ''
  ]
  for (const errorLine of errorLines) {
    lines.push(`${ERROR_LINE_PREFIX}${errorLine}`)
  }
  return `${lines.join('\n')}\n`
}
