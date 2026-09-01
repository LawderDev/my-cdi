import { ErrorCode } from '@lib/errors'
import type { UseCaseResult } from '@lib/use-case'
import type { StudentGateway } from '@student/gateways/student'

interface DeleteStudentDeps {
  gateway: StudentGateway
}

interface DeleteStudentInput {
  id: number
}

export async function deleteStudent(
  deps: DeleteStudentDeps,
  input: DeleteStudentInput
): Promise<UseCaseResult<{ id: number }>> {
  const existingStudent = await deps.gateway.getById(input.id)
  if (!existingStudent) {
    return { success: false, error: 'Student not found', code: ErrorCode.STUDENT_NOT_FOUND }
  }

  const deleted = await deps.gateway.delete(input.id)
  if (!deleted) {
    return { success: false, error: 'Failed to delete student', code: ErrorCode.DATABASE_ERROR }
  }

  return { success: true, data: { id: input.id } }
}
