import { z } from 'zod'

export const NOM_MAX_LENGTH = 100
export const PRENOM_MAX_LENGTH = 100
export const CLASSE_MAX_LENGTH = 50
export const INE_MAX_LENGTH = 50

export const createStudentSchema = z.object({
  nom: z.string().trim().min(1, 'Le nom est obligatoire').max(NOM_MAX_LENGTH),
  prenom: z.string().trim().min(1, 'Le prénom est obligatoire').max(PRENOM_MAX_LENGTH),
  classe: z.string().trim().min(1, 'La classe est obligatoire').max(CLASSE_MAX_LENGTH),
  ine: z.string().trim().min(1, "L'INE est obligatoire").max(INE_MAX_LENGTH)
})

export const updateStudentSchema = z.object({
  nom: z.string().trim().min(1).max(NOM_MAX_LENGTH).optional(),
  prenom: z.string().trim().min(1).max(PRENOM_MAX_LENGTH).optional(),
  classe: z.string().trim().min(1).max(CLASSE_MAX_LENGTH).optional(),
  ine: z.string().trim().min(1).max(INE_MAX_LENGTH).optional()
})

export type CreateStudentDto = z.infer<typeof createStudentSchema>

export type UpdateStudentDto = z.infer<typeof updateStudentSchema>

export interface StudentResponseDto {
  id: number
  nom: string
  prenom: string
  classe: string
  ine: string
  fullName: string
  createdAt: string
  updatedAt: string
}

export interface StudentListResponseDto {
  students: StudentResponseDto[]
}

export interface BulkStudentResponseDto {
  created: number
  errors: number
}

export interface CsvImportResult {
  created: number
  errors: number
  errorMessages: string[]
}
