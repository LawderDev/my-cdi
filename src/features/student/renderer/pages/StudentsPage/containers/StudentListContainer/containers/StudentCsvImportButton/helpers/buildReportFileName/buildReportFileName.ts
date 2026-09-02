const REPORT_SUFFIX = '.errors.txt'
const ISO_DATE_PREFIX_LENGTH = 10

/**
 * Builds the error-report file name for a CSV import: the CSV base name,
 * suffixed with the current date and the `.errors.txt` extension.
 */
export function buildReportFileName(csvFileName: string, date: Date): string {
  const baseName = csvFileName.replace(/\.[^./]+$/, '')
  const isoDate = date.toISOString().slice(0, ISO_DATE_PREFIX_LENGTH)
  return `${baseName}-${isoDate}${REPORT_SUFFIX}`
}
