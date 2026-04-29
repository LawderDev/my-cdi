import { createStudentSchema } from '@student-shared'
import { formatStudentResponse } from '../helpers/formatStudentResponse'
import type { UseCaseResult } from '../types/UseCaseResult'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentResponseDto, CreateStudentDto } from '@student-shared'

interface CreateStudentDeps {
  gateway: StudentGateway
}

export async function createStudent(
  deps: CreateStudentDeps,
  input: CreateStudentDto
): Promise<UseCaseResult<StudentResponseDto>> {
  const parseResult = createStudentSchema.safeParse(input)
  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0]
    const message = firstError?.message ?? 'Validation error'
    return { success: false, error: message }
  }

  const existingStudents = await deps.gateway.getAll()
  const newIne = parseResult.data.ine.trim().toLowerCase()
  const duplicateIne = existingStudents.find((s) => s.ine.trim().toLowerCase() === newIne)
  if (duplicateIne) {
    return { success: false, error: 'Un élève avec cet INE existe déjà' }
  }

  const entity = await deps.gateway.create(parseResult.data)
  return { success: true, data: formatStudentResponse(entity) }
}
