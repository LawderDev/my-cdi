import { updateStudentSchema } from '@student-shared'
import { formatStudentResponse } from '../helpers/formatStudentResponse'
import type { UseCaseResult } from '../types/UseCaseResult'
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
    return { success: false, error: message }
  }

  const existingStudent = await deps.gateway.getById(input.id)
  if (!existingStudent) {
    return { success: false, error: 'Élève introuvable' }
  }

  if (parseResult.data.ine !== undefined) {
    const newIne = parseResult.data.ine.trim().toLowerCase()
    const allStudents = await deps.gateway.getAll()
    const duplicate = allStudents.find(
      (s) => s.id !== input.id && s.ine.trim().toLowerCase() === newIne
    )
    if (duplicate) {
      return { success: false, error: 'Un élève avec cet INE existe déjà' }
    }
  }

  const entity = await deps.gateway.update(input.id, parseResult.data)
  if (!entity) {
    return { success: false, error: 'Erreur lors de la mise à jour' }
  }

  return { success: true, data: formatStudentResponse(entity) }
}
