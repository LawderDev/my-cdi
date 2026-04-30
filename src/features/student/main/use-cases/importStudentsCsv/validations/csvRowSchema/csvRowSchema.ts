import { z } from 'zod'
import { createStudentSchema } from '@student-shared'

export const csvRowSchema = createStudentSchema

export type CsvRow = z.infer<typeof csvRowSchema>
