import type { StudentResponseDto } from '@student-shared'
import type { StudentEntity } from '@student/entities/student'
import { computeStudentFields } from '@student/entities/student'

export function formatStudentResponse(entity: StudentEntity): StudentResponseDto {
  const { fullName } = computeStudentFields(entity)
  return {
    id: entity.id,
    nom: entity.nom,
    prenom: entity.prenom,
    classe: entity.classe,
    ine: entity.ine,
    fullName,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}
