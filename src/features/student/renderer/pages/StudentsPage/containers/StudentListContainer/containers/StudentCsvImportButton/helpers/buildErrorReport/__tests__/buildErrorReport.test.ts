import { describe, it, expect } from 'vitest'
import { buildErrorReport } from '../buildErrorReport'

const translate = (key: string, options?: Record<string, unknown>): string =>
  `${key}[${JSON.stringify(options) ?? ''}]`

describe('buildErrorReport', () => {
  it('builds a title, the file name, a summary and one prefixed line per error', () => {
    const report = buildErrorReport({
      fileName: 'eleves.csv',
      created: 3,
      updated: 1,
      errorLines: [
        'Jean Dupont : INE déjà existant',
        'Pierre Martin : Ligne 12: champ obligatoire'
      ],
      translate
    })

    expect(report).toBe(
      [
        'csvImport.reportTitle[]',
        'eleves.csv',
        'csvImport.summary[{"count":3,"updated":1,"errors":2}]',
        '',
        '- Jean Dupont : INE déjà existant',
        '- Pierre Martin : Ligne 12: champ obligatoire',
        ''
      ].join('\n')
    )
  })

  it('ends with a trailing newline and no error lines when the list is empty', () => {
    const report = buildErrorReport({
      fileName: 'eleves.csv',
      created: 0,
      updated: 0,
      errorLines: [],
      translate
    })

    expect(report.endsWith('\n')).toBe(true)
    expect(report).not.toContain('- ')
  })
})
