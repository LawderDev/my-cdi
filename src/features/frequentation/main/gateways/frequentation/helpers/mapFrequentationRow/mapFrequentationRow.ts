import {
  FrequentationEntitySchema,
  FrequentationWithStudentEntitySchema
} from '@frequentation/entities/frequentation'
import type {
  FrequentationEntity,
  FrequentationWithStudentEntity
} from '@frequentation/entities/frequentation'

export function mapFrequentationRow(row: Record<string, unknown>): FrequentationEntity {
  return FrequentationEntitySchema.parse({
    id: row.id,
    startsAt: row.startsAt,
    activity: row.activity,
    studentId: row.studentId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  })
}

export function mapFrequentationWithStudentRow(
  row: Record<string, unknown>
): FrequentationWithStudentEntity {
  return FrequentationWithStudentEntitySchema.parse({
    id: row.id,
    startsAt: row.startsAt,
    activity: row.activity,
    studentId: row.studentId,
    studentNom: row.studentNom,
    studentPrenom: row.studentPrenom,
    studentClasse: row.studentClasse,
    studentIne: row.studentIne,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  })
}
