import { z } from 'zod'
import { activityTypeSchema } from '@frequentation/validations/activityTypeSchema'

const MIN_STUDENTS = 1

export const journalEntryFormSchema = z.object({
  studentIds: z.array(z.number().int().positive()).min(MIN_STUDENTS),
  activity: activityTypeSchema,
  time: z.string().regex(/^\d{2}:\d{2}$/, 'time must be HH:mm')
})

export type JournalEntryFormValues = z.infer<typeof journalEntryFormSchema>
