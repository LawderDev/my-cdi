import type { UseCaseResult } from '../types/UseCaseResult'
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
    return { success: false, error: 'Élève introuvable' }
  }

  const deleted = await deps.gateway.delete(input.id)
  if (!deleted) {
    return { success: false, error: 'Erreur lors de la suppression' }
  }

  return { success: true, data: { id: input.id } }
}
