import type { StudentViewModel } from '@student/types'

/**
 * Normalization matches the main-process use cases (createStudent /
 * updateStudent): INEs are compared trimmed and lowercased.
 */
export function findStudentByIne(
  students: StudentViewModel[],
  ine: string,
  excludeId?: number
): StudentViewModel | null {
  const normalized = ine.trim().toLowerCase()
  if (normalized === '') {
    return null
  }
  const match = students.find(
    (student) => student.ine.trim().toLowerCase() === normalized && student.id !== excludeId
  )
  return match ?? null
}