// Student Module Repository Helpers
// Helper functions for data transformation in the repository layer

import { StudentEntity, StudentDbRow } from '../../../main/types/entities/student.entity'
import { CreateStudentDto, UpdateStudentDto } from '../../../shared/types/dtos/student.dto'

// Entity → Entity transformation (for creation)
export function transformStudentDtoToEntity(
  dto: CreateStudentDto
): Omit<StudentEntity, 'id' | 'created_at' | 'updated_at'> {
  return {
    nom: dto.nom.trim(),
    prenom: dto.prenom.trim(),
    classe: dto.classe.trim()
  }
}

// Update DTO → Partial Entity transformation
export function transformStudentUpdateDtoToEntity(
  dto: UpdateStudentDto
): Partial<Omit<StudentEntity, 'id'>> {
  const partial: Partial<Omit<StudentEntity, 'id'>> = {}

  if (dto.nom !== undefined) partial.nom = dto.nom.trim()
  if (dto.prenom !== undefined) partial.prenom = dto.prenom.trim()
  if (dto.classe !== undefined) partial.classe = dto.classe.trim()

  return partial
}

// Database Row → Entity transformation (replaces Record<string, unknown>)
export function transformStudentDbRowToEntity(row: StudentDbRow): StudentEntity {
  // Validate required fields
  const requiredFields = ['id', 'nom', 'prenom', 'classe']
  const missingFields = requiredFields.filter((field) => !(field in row))

  if (missingFields.length > 0) {
    throw new Error(`Invalid student database row: missing ${missingFields.join(', ')}`)
  }

  return {
    id: typeof row.id === 'number' ? row.id : parseInt(String(row.id)),
    nom: String(row.nom || ''),
    prenom: String(row.prenom || ''),
    classe: String(row.classe || ''),
    created_at: String(row.created_at || ''),
    updated_at: String(row.updated_at || '')
  }
}
