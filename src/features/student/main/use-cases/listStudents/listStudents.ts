import { formatStudentResponse } from '../helpers/formatStudentResponse'
import type { UseCaseResult } from '@lib/use-case'
import type { StudentGateway } from '@student/gateways/student'
import type { StudentListResponseDto } from '@student-shared'

interface ListStudentsDeps {
  gateway: StudentGateway
}

interface ListStudentsInput {
  classe?: string
}

export async function listStudents(
  deps: ListStudentsDeps,
  input: ListStudentsInput
): Promise<UseCaseResult<StudentListResponseDto>> {
  const entities = input.classe
    ? await deps.gateway.getByClass(input.classe)
    : await deps.gateway.getAll()

  const students = entities.map(formatStudentResponse)

  return { success: true, data: { students } }
}
