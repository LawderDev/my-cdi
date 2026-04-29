import { formatStudentResponse } from '../helpers/formatStudentResponse'
import type { UseCaseResult } from '../types/UseCaseResult'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentResponseDto } from '@student-shared'

interface GetStudentDeps {
  gateway: StudentGateway
}

interface GetStudentInput {
  id: number
}

export async function getStudent(
  deps: GetStudentDeps,
  input: GetStudentInput
): Promise<UseCaseResult<StudentResponseDto>> {
  const entity = await deps.gateway.getById(input.id)
  if (!entity) {
    return { success: false, error: 'Élève introuvable' }
  }

  return { success: true, data: formatStudentResponse(entity) }
}
