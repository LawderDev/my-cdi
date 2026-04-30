import { z } from 'zod'
import { activityTypeSchema } from '@frequentation/validations/activityTypeSchema'

const MIN_STUDENTS = 1

export const journalEntryFormSchema = z.object({
  studentIds: z.array(z.number().int().positive()).min(MIN_STUDENTS),
  activity: activityTypeSchema
})

export type JournalEntryFormValues = z.infer<typeof journalEntryFormSchema>
