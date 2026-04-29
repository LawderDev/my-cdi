import { studentEntitySchema } from '@student/entities/student'
import type { StudentEntity } from '@student/entities/student'

export function mapStudentRow(row: Record<string, unknown>): StudentEntity {
  return studentEntitySchema.parse(row)
}
