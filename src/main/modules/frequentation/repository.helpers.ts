// Frequentation Module Repository Helpers
// Helper functions for data transformation in the repository layer

import {
  FrequentationEntity,
  FrequentationWithStudentEntity,
  FrequentationDbRow,
  FrequentationWithStudentDbRow
} from '../../../main/types/entities/frequentation.entity'
import {
  CreateFrequentationDto,
  UpdateFrequentationDto
} from '../../../shared/types/dtos/frequentation.dto'

// Entity → Entity transformation (for creation)
export function transformFrequentationDtoToEntity(
  dto: CreateFrequentationDto
): Omit<FrequentationEntity, 'id' | 'created_at' | 'updated_at'> {
  return {
    starts_at: new Date(dto.startsAt).toISOString(),
    activity: dto.activity.trim(),
    student_id: dto.studentId
  }
}

// Update DTO → Partial Entity transformation
export function transformFrequentationUpdateDtoToEntity(
  dto: UpdateFrequentationDto
): Partial<Omit<FrequentationEntity, 'id'>> {
  const partial: Partial<Omit<FrequentationEntity, 'id'>> = {}

  if (dto.startsAt !== undefined) partial.starts_at = new Date(dto.startsAt).toISOString()
  if (dto.activity !== undefined) partial.activity = dto.activity.trim()
  if (dto.studentId !== undefined) partial.student_id = dto.studentId

  return partial
}

// Database Row → Entity transformation
export function transformFrequentationDbRowToEntity(row: FrequentationDbRow): FrequentationEntity {
  // Validate required fields
  const requiredFields = ['id', 'starts_at', 'activity', 'student_id']
  const missingFields = requiredFields.filter((field) => !(field in row))

  if (missingFields.length > 0) {
    throw new Error(`Invalid frequentation database row: missing ${missingFields.join(', ')}`)
  }

  return {
    id: typeof row.id === 'number' ? row.id : parseInt(String(row.id)),
    starts_at: String(row.starts_at || ''),
    activity: String(row.activity || ''),
    student_id:
      typeof row.student_id === 'number' ? row.student_id : parseInt(String(row.student_id)),
    created_at: String(row.created_at || ''),
    updated_at: String(row.updated_at || '')
  }
}

// Database Row with Student → Entity transformation
export function transformFrequentationWithStudentDbRowToEntity(
  row: FrequentationWithStudentDbRow
): FrequentationWithStudentEntity {
  const baseEntity = transformFrequentationDbRowToEntity(row)

  return {
    ...baseEntity,
    nom: String(row.nom || ''),
    prenom: String(row.prenom || ''),
    classe: String(row.classe || '')
  }
}
