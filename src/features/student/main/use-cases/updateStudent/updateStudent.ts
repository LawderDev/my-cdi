import { updateStudentSchema } from '@student-shared'
import { formatStudentResponse } from '../helpers/formatStudentResponse'
import { ErrorCode } from '@lib/errors'
import type { UseCaseResult } from '@lib/use-case'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentResponseDto, UpdateStudentDto } from '@student-shared'

interface UpdateStudentDeps {
  gateway: StudentGateway
}

interface UpdateStudentInput {
  id: number
  dto: UpdateStudentDto
}

export async function updateStudent(
  deps: UpdateStudentDeps,
  input: UpdateStudentInput
): Promise<UseCaseResult<StudentResponseDto>> {
  const parseResult = updateStudentSchema.safeParse(input.dto)
  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0]
    const message = firstError?.message ?? 'Validation error'
    return { success: false, error: message, code: ErrorCode.VALIDATION_ERROR }
  }

  const existingStudent = await deps.gateway.getById(input.id)
  if (!existingStudent) {
    return { success: false, error: 'Student not found', code: ErrorCode.STUDENT_NOT_FOUND }
  }

  if (parseResult.data.ine !== undefined) {
    const newIne = parseResult.data.ine.trim().toLowerCase()
    const allStudents = await deps.gateway.getAll()
    const duplicate = allStudents.find(
      (s) => s.id !== input.id && s.ine.trim().toLowerCase() === newIne
    )
    if (duplicate) {
      return {
        success: false,
        error: 'A student with this INE already exists',
        code: ErrorCode.STUDENT_DUPLICATE_INE
      }
    }
  }

  const entity = await deps.gateway.update(input.id, parseResult.data)
  if (!entity) {
    return { success: false, error: 'Failed to update student', code: ErrorCode.DATABASE_ERROR }
  }

  return { success: true, data: formatStudentResponse(entity) }
}
