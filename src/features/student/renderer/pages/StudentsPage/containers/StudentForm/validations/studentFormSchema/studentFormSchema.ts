import { z } from 'zod'
import {
  nomSchema,
  prenomSchema,
  classeSchema,
  ineSchema
} from '@student/validations/studentSchema'

export const studentFormSchema = z.object({
  nom: nomSchema,
  prenom: prenomSchema,
  classe: classeSchema,
  ine: ineSchema
})

export type StudentFormValues = z.infer<typeof studentFormSchema>
