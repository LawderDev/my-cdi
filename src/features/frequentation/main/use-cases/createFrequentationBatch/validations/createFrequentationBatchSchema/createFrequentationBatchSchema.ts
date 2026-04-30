import { z } from 'zod'
import { ActivityType } from '@types'

export const MAX_BATCH_SIZE = 100

const createFrequentationItemSchema = z.object({
  startsAt: z.string().min(1),
  activity: z.nativeEnum(ActivityType),
  studentId: z.number().int().positive()
})

export const createFrequentationBatchSchema = z.object({
  frequentations: z.array(createFrequentationItemSchema).min(1).max(MAX_BATCH_SIZE)
})
