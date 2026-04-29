export const STUDENT_CHANNELS = {
  CREATE: 'student.create',
  GET: 'student.get',
  LIST: 'student.list',
  UPDATE: 'student.update',
  DELETE: 'student.delete',
  IMPORT_CSV: 'student.importCsv'
} as const

export const FREQUENTATION_CHANNELS = {
  CREATE: 'frequentation.create',
  GET: 'frequentation.get',
  LIST: 'frequentation.list',
  UPDATE: 'frequentation.update',
  DELETE: 'frequentation.delete',
  CREATE_BATCH: 'frequentation.createBatch',
  GET_JOURNAL_ENTRIES: 'frequentation.getJournalEntries'
} as const

export type StudentChannel = (typeof STUDENT_CHANNELS)[keyof typeof STUDENT_CHANNELS]
export type FrequentationChannel =
  (typeof FREQUENTATION_CHANNELS)[keyof typeof FREQUENTATION_CHANNELS]
